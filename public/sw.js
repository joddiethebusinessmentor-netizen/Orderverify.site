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
    const body = event.data.body || 'Pesa ulizoomba kutoa kwenye akaunti yetu ya OrderVerify zimetolewa kwenye balance yako na ziko pending kwa sababu huna akaunti iliyowashwa kwenye profile ya kulipwa. Tafadhali ingia kwenye website yetu au wasiliana na wakala wetu ili ukamilishe akaunti yako na upokee pesa zako leo hii. Karibu sana!';
    
    // Inatokea kama Heads-Up Pop-Up juu ya kioo cha simu (bila vitufe vya ziada kama mwanzo)
    self.registration.showNotification(title, {
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
