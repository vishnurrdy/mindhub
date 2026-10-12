const CACHE_NAME = "mindhub-core-v1";
const CORE_ASSETS = [
  "/",
  "/Dashboard.html",
  "/ai-chat.html",
  "/offline-media/index.html",
  "/offline-media/app.js",
  "/offline-media/sw.js",
  "/media-library/index.html",
  "/js/ai-chat.js",
  "/js/site.js",
  "/js/i18n.js",
  "/styles.css",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: try cache first, fall back to network, and update cache in background
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          try {
            if (res && res.ok) {
              const copy = res.clone();
              caches.open(CACHE_NAME).then((c) => c.put(req, copy));
            }
          } catch (e) {}
          return res;
        })
        .catch(() => null);
      return cached || network || caches.match("/Dashboard.html");
    })
  );
});

// Allow clients to message the SW for cache management
self.addEventListener("message", (ev) => {
  const m = ev.data || {};
  if (m && m.type === "skipWaiting") self.skipWaiting();
});
