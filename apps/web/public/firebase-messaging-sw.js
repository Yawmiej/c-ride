self.addEventListener('push', (event) => {
  if (!event.data) return;

  const payload = event.data.json();
  const notification = payload.notification ?? {};
  event.waitUntil(
    self.registration.showNotification(notification.title ?? 'C-Ride', {
      body: notification.body ?? '',
      data: payload.data ?? {},
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const link = event.notification.data?.link ?? '/';
  event.waitUntil(self.clients.openWindow(link));
});
