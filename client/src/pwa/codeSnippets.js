/** Service worker registreatiion */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('serviceWorker.js');
      console.log('Service worker registered with score', registration.scope);
    } catch (err) {
      console.error('ServiceWorker registration failed: ', err);
    }
  });
}

/** Service Worker: Install handler */

self.addEventListener('install', async function (event) {
  console.log('[Service Worker]: Installing...');
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(cacheName);
      await cache.addAll(staticAssets);
      console.log('[Service Worker]: Precaching finished. Installation successful');
    } catch (err) {
      console.error('[Service Worker]: Installation failed because of', err);
      throw err;
    }
  })());
});

/** Service Worker: Fetch handler */

self.addEventListener('fetch', async function (event) {
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

/** Service Worker: Push handler */

self.addEventListener('push', async function (event) {
  console.log('[Service Worker]: Push received with the following data', event.data.text());

  const title = 'Meet Up App';
  const options = {
    body: event.data.text(),
    icon: 'assets/img/bell.svg',
    badge: 'assets/img/spoon-knife.svg',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
