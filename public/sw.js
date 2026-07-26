self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let payload = {};

  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = {
      title: "Emanuel Admin",
      body: event.data ? event.data.text() : "Masz nowe powiadomienie.",
    };
  }

  const title = payload.title || "Emanuel Admin";
  const options = {
    body: payload.body || "Masz nowe powiadomienie.",
    icon: payload.icon || "/android-chrome-192x192.png",
    badge: payload.badge || "/favicon-48x48.png",
    tag: payload.tag || "emanuel-admin",
    renotify: true,
    vibrate: [150, 80, 150],
    data: {
      url: payload.url || "/admin?tab=messages",
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = new URL(
    event.notification.data?.url || "/admin?tab=messages",
    self.location.origin,
  ).href;

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        const existingClient = windowClients.find(
          (client) => new URL(client.url).origin === self.location.origin,
        );

        if (existingClient) {
          return existingClient
            .navigate(targetUrl)
            .then(() => existingClient.focus());
        }

        return self.clients.openWindow(targetUrl);
      }),
  );
});
