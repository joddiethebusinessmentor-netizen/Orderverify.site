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
    // Broadcast to ALL subscribers
    targets = Object.values(subs);
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
