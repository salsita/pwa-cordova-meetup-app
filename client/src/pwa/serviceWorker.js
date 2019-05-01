const version = 1;
const cacheName = `salsita-meetup-cache-v${version}`;

self.addEventListener('install', async function(event) {
  console.log('[Service Worker]: Installing...');
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(cacheName);
      await cache.addAll([
        'index.html',
        'es2015-polyfills.js',
        'main.js',
        'polyfills.js',
        'runtime.js',
        'styles.css',
        'assets/img/do-not-go.jpg',
        'assets/img/assets/img/Matt.jpg',
        'assets/img/office-plan.svg',
        'assets/img/running-white.gif',
        'assets/img/salsita-logo.jpg',
        'assets/img/sprite.svg',
        'assets/img/waiter_run.gif',
      ]);
      console.log('[Service Worker]: Precaching finished. Installation successful');
    } catch (err) {
      console.error('[Service Worker]: Installation failed because of', err);
      throw err;
    }
  })());
});

self.addEventListener('fetch', async function(event) {
  console.log('[Service Worker]: Fetch event -> received', event.request.method, 'request to', event.request.url);
  event.respondWith((async () => {
    let response = await caches.match(event.request);
    if (!response) {
      console.log('[Service Worker]: Cache miss, sending request through to');
      response = await fetch(event.request);
      if (!response || response.status !== 200 || response.type !== 'basic' || event.request.method !== 'GET') {
        console.log('[Service Worker]: Done, but the response is not cacheable');
      } else {
        console.log('[Service Worker]: Done, caching the response');

        const responseToCache = response.clone();
        const cache = await caches.open(cacheName);
        cache.put(event.request, responseToCache);
      }
    } else {
      console.log('[Service Worker]: Served from cache');
    }
    return response;
  })());
});
