// Kailash Parbat - Service Worker
// Bump CACHE_VERSION on every deploy so installed phones get the new files.
const CACHE_VERSION = 'kailash-parbat-v4';
const APP_SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png',
  './icon-512.png', './icon-512-maskable.png', './apple-touch-icon.png', './favicon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_VERSION).then((c) => c.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE_VERSION).then((c) => c.put('./index.html', copy));
      return res;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
    if (res && res.status === 200) { const copy = res.clone(); caches.open(CACHE_VERSION).then((c) => c.put(req, copy)); }
    return res;
  })));
});
