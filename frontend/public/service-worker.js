/* Round Table — Minimal Service Worker (PWA install support) */
const CACHE_VERSION = "rt-v1";

self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first for everything; lets the app run normally and just enables installability.
self.addEventListener("fetch", (event) => {
  // Don't intercept API/WebSocket traffic
  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/api/")) return;
  // Pass-through; do not interfere
});
