const CACHE_NAME = 'fresno-games-shell-v1';

const SHELL_ASSETS = [
  '/',                // Root
  '/index.html',      // Main platform page
  '/manifest.json',   // PWA manifest
  '/service-worker.js',
  '/icon-192.png',    // Your icons
  '/icon-512.png'
];

// Install event – caches the platform shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_ASSETS))
  );
});

// Fetch event – serves cached files AND auto-caches game assets
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});
