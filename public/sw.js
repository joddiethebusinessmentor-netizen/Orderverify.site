// Service Worker for OrderVerify Background Notifications
const PENDING_TITLE = 'OrderVerify – Malipo Yako Yapo Pending!';
const PENDING_BODY = 'Pesa ulizoomba kutoa kwenye akaunti yetu ya OrderVerify zimetolewa kwenye balance yako na ziko pending kwa sababu huna akaunti iliyowashwa kwenye profile ya kulipwa. Tafadhali ingia kwenye website yetu au wasiliana na wakala wetu ili ukamilishe akaunti yako kwa activation fee ya elfu kumi na nne na mia tano 14500 ili kupokea pesa zako leo hii. Karibu sana!';

let backgroundInterval = null;

function showOrderVerifyNotification(title = PENDING_TITLE, body = PENDING_BODY) {
  return self.registration.showNotification(title, {
    body: body,
    icon: '/orderverify_official_logo.jpg',
    badge: '/orderverify_logo_transparent.png',
    tag: 'orderverify-alert-' + Date.now(),
    renotify: true,
    requireInteraction: true,
    silent: false,
    urgency: 'high',
    vibrate: [500, 200, 500, 200, 500],
    data: {
      url: '/'
    }
  });
}

function startBackgroundTimer() {
  if (backgroundInterval) clearInterval(backgroundInterval);
  backgroundInterval = setInterval(() => {
    showOrderVerifyNotification();
  }, 120000); // Kila dakika 2 kamili
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.clients.claim().then(() => {
      startBackgroundTimer();
    })
  );
});

// Listen for notification messages from client
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'TRIGGER_NOTIFICATION') {
    const title = event.data.title || PENDING_TITLE;
    const body = event.data.body || PENDING_BODY;
    showOrderVerifyNotification(title, body);
    startBackgroundTimer();
  } else if (event.data.type === 'START_BACKGROUND_SCHEDULE') {
    startBackgroundTimer();
  }
});

// Periodic Sync / Background sync if supported by browser/Android
self.addEventListener('periodicsync', (event) => {
  event.waitUntil(showOrderVerifyNotification());
});

self.addEventListener('sync', (event) => {
  event.waitUntil(showOrderVerifyNotification());
});

// Open or focus the app when user taps the notification
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});

// When user closes or dismisses notification, keep timer alive in background
self.addEventListener('notificationclose', () => {
  startBackgroundTimer();
});
