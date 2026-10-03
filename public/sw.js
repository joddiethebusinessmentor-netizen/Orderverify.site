// Service Worker for OrderVerify Background Notifications
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Listen for notification messages from client
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'TRIGGER_NOTIFICATION') {
    const title = event.data.title || 'OrderVerify – Malipo Yako Yapo Pending!';
    const body = event.data.body || 'Pesa ulizoomba kutoa kwenye akaunti yetu ya OrderVerify zimetolewa kwenye balance yako na ziko pending kwa sababu huna akaunti iliyowashwa kwenye profile ya kulipwa. Tafadhali kamilisha akaunti yako kwa activation fee ya elfu kumi na nne na mia tano 14500 ili kupokea pesa zako leo hii. Karibu sana!';
    
    // Inatokea juu ya screen ya simu (heads-up pop-up) yenye mtetemo kama WhatsApp/SMS
    self.registration.showNotification(title, {
      body: body,
      icon: '/orderverify_official_logo.jpg',
      badge: '/orderverify_logo_transparent.png',
      tag: 'orderverify-alert-' + Date.now(),
      renotify: true,
      requireInteraction: true,
      silent: false,
      vibrate: [500, 200, 500, 200, 500],
      data: {
        url: '/'
      }
    });
  }
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
