import express from 'express';
import webpush from 'web-push';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// VAPID Credentials for Web Push
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || 'BFBhxwnnWkz7MrHyXye44UH12o9twrla8JSw2qgEcY3IIO7JjmiVRE5zR6AzRvNEr85pJ8xqkrNhYr4moZHWDEw';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || 'yPggbq09d9pXa0iphTh8raAHWmYk7oB2-D0AhVfgQqM';

webpush.setVapidDetails(
  'mailto:zuhurasalum186@gmail.com',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

// In-memory & file storage for push subscriptions
const SUBS_FILE = path.join(__dirname, 'subscriptions.json');

function loadSubscriptions(): Record<string, any> {
  try {
    if (fs.existsSync(SUBS_FILE)) {
      const data = fs.readFileSync(SUBS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error loading subscriptions:', e);
  }
  return {};
}

function saveSubscriptions(subs: Record<string, any>) {
  try {
    fs.writeFileSync(SUBS_FILE, JSON.stringify(subs, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error saving subscriptions:', e);
  }
}

// 1. Get Public VAPID Key
app.get('/api/vapid-public-key', (req, res) => {
  res.json({ publicKey: VAPID_PUBLIC_KEY });
});

// 2. Register Client Push Subscription
app.post('/api/push-subscribe', (req, res) => {
  const { subscription, phoneNumber, withdrawalId } = req.body;
  if (!subscription || !subscription.endpoint) {
    return res.status(400).json({ error: 'Subscription missing or invalid' });
  }

  const subs = loadSubscriptions();
  const id = withdrawalId || phoneNumber || subscription.endpoint;
  subs[id] = {
    subscription,
    phoneNumber,
    withdrawalId,
    updatedAt: new Date().toISOString()
  };
  saveSubscriptions(subs);

  res.json({ success: true, count: Object.keys(subs).length });
});

// 3. Send Web Push Notification to Specific User or Broadcast to All
app.post('/api/send-push', async (req, res) => {
  const { withdrawalId, phoneNumber, title, body, url } = req.body;
  const subs = loadSubscriptions();
  const subKeys = Object.keys(subs);

  if (subKeys.length === 0) {
    return res.json({ success: true, sentCount: 0, message: 'No push subscribers found yet' });
  }

  const payload = JSON.stringify({
    title: title || 'OrderVerify – Malipo Yako Yapo Pending!',
    body: body || 'Pesa ulizoomba kutoa kwenye akaunti yetu ya OrderVerify zimetolewa kwenye balance yako na ziko pending kwa sababu huna akaunti iliyowashwa kwenye profile ya kulipwa. Tafadhali kamilisha ada ya usajili ya 14,500/= ili upokee pesa zako leo hii.',
    url: url || '/'
  });

  let targets: any[] = [];

  if (withdrawalId || phoneNumber) {
    // Specific client
    targets = subKeys
      .map(k => subs[k])
      .filter(s => s.withdrawalId === withdrawalId || s.phoneNumber === phoneNumber || (s.subscription && s.subscription.endpoint === withdrawalId));
    // If not found by exact ID, fallback to all matching or send
    if (targets.length === 0 && subs[withdrawalId]) {
      targets = [subs[withdrawalId]];
    }
  } else {
    // Broadcast to users who have registered withdrawal activity
    const withActivity = Object.values(subs).filter((s: any) => s.withdrawalId || s.phoneNumber);
    targets = withActivity.length > 0 ? withActivity : Object.values(subs);
  }

  let sentCount = 0;
  const expiredKeys: string[] = [];

  for (const t of targets) {
    if (!t.subscription) continue;
    try {
      await webpush.sendNotification(t.subscription, payload);
      sentCount++;
    } catch (err: any) {
      console.error('Failed to send push to target:', err?.statusCode || err?.message);
      // Status 410 or 404 means the subscription has expired or was revoked
      if (err.statusCode === 410 || err.statusCode === 404) {
        expiredKeys.push(t.withdrawalId || t.phoneNumber || t.subscription.endpoint);
      }
    }
  }

  // Clean expired subscriptions
  if (expiredKeys.length > 0) {
    expiredKeys.forEach(k => delete subs[k]);
    saveSubscriptions(subs);
  }

  res.json({ success: true, sentCount, totalTargets: targets.length });
});

// --- BEEM AFRICA SMS INTEGRATION ---
const BEEM_API_KEY = process.env.BEEM_API_KEY || '2a5656f4d9ceb687';
const BEEM_SECRET_KEY = process.env.BEEM_SECRET_KEY || 'NDg2ZjM5NTI0MTYwMDlhMDg2MmRlYzlkZmM4M2QyNDZiYzU1NDBmYTQ3YmY2YTc3YzE4OTc2MDBjMWY1ZjhhMQ==';
const BEEM_SENDER_NAME = process.env.BEEM_SENDER_NAME || 'ORDERVERIFY';

// Format phone number to Tanzanian standard 2557XXXXXXXX / 2556XXXXXXXX
function formatTzPhone(raw: string): string {
  let cleaned = String(raw || '').replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '255' + cleaned.substring(1);
  } else if (cleaned.length === 9) {
    cleaned = '255' + cleaned;
  }
  return cleaned;
}

// 4. Get Beem SMS Credit Balance
app.get('/api/beem-balance', async (req, res) => {
  try {
    const authHeader = 'Basic ' + Buffer.from(`${BEEM_API_KEY}:${BEEM_SECRET_KEY}`).toString('base64');
    const response = await fetch('https://apisms.beem.africa/public/v1/vendors/balance', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      }
    });
    const data = await response.json();
    res.json({ success: true, data });
  } catch (e: any) {
    console.error('Error fetching Beem balance:', e);
    res.status(500).json({ success: false, error: e?.message || 'Failed to fetch balance' });
  }
});

// 5. Send Normal SMS through Beem Africa
app.post('/api/send-sms', async (req, res) => {
  const { phoneNumber, message, senderName } = req.body;
  if (!phoneNumber) {
    return res.status(400).json({ success: false, error: 'Phone number is required' });
  }

  const destPhone = formatTzPhone(phoneNumber);
  const sourceAddr = senderName || BEEM_SENDER_NAME;
  const smsBody = message || 'OrderVerify: Pesa ulizoomba kutoa ziko pending kwa sababu akaunti yako haijawashwa. Tembelea website yetu kukamilisha profile yako ili upokee malipo yako leo.';

  try {
    const authHeader = 'Basic ' + Buffer.from(`${BEEM_API_KEY}:${BEEM_SECRET_KEY}`).toString('base64');
    const beemResponse = await fetch('https://apisms.beem.africa/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        source_addr: sourceAddr,
        schedule_time: '',
        encoding: 0,
        message: smsBody,
        recipients: [
          {
            recipient_id: 1,
            dest_addr: destPhone
          }
        ]
      })
    });

    const beemData: any = await beemResponse.json();

    // Check if Beem returned invalid sender (Sender ID still pending approval)
    if (beemData?.data?.error_code === 'API_INVALID_PARAMETER' && beemData?.data?.context?.field === 'sender_id') {
      return res.json({
        success: false,
        pendingSender: true,
        message: `Jina la mtumaji "${sourceAddr}" bado liko kwenye ukaguzi (Pending) wa mitandao ya simu/TCRA. Mara likishapitishwa litatuma mara moja.`,
        beemResponse: beemData
      });
    }

    if (beemData?.successful || beemData?.code === 100 || beemResponse.ok) {
      return res.json({
        success: true,
        message: `SMS imetumwa kikamilifu kwa ${destPhone} ikiwa na jina la ${sourceAddr}!`,
        beemResponse: beemData
      });
    }

    return res.json({
      success: false,
      message: beemData?.message || 'Ujumbe haujatumwa.',
      beemResponse: beemData
    });
  } catch (err: any) {
    console.error('Error sending Beem SMS:', err);
    res.status(500).json({ success: false, error: err?.message || 'Failed to send SMS' });
  }
});

// Vite Middleware integration for development
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
