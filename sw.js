// Service worker mínimo — habilita que el sitio sea instalable como app (PWA)
const CACHE_NAME = 'cuaderno-incidencias-5e-v2';

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.filter((name) => name !== CACHE_NAME)
             .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Estrategia simple: intenta la red, si falla usa caché
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
