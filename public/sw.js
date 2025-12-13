self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Слушатель пуш-уведомлений (сработает, если подключить реальный бэкенд)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  
  const title = data.title || 'Pocket AI Signal';
  const options = {
    body: data.body || 'New trading opportunity detected!',
    icon: 'https://cdn-icons-png.flaticon.com/512/3429/3429149.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/3429/3429149.png',
    data: { url: '/' }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Клик по уведомлению открывает приложение
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      if (clientList.length > 0) {
        let client = clientList[0];
        if ('focus' in client) return client.focus();
      }
      return clients.openWindow('/');
    })
  );
});