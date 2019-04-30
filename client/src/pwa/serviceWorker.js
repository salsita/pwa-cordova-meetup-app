const version = 1;
const cacheName = `salsita-meetup-cache-v${version}`;

self.addEventListener('install', async function(event) {
  console.log('Installing the service worker...');
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(cacheName);
      await cache.addAll([
        '/',
        '/assets/img/do-not-go.jpg',
        '/assets/img/Matt.jpg',
        'office-plan.svg',
        'running-white.gif',
        'salsita-logo.jpg',
        'sprite.svg',
        'waiter_run.gif',
      ]);
      console.log('Precaching finished. Installation successful');
    } catch (err) {
      console.error('Installation failed because of', err);
      throw err;
    }
  })());
});

self.addEventListener('fetch', async function(event) {
  console.log('Fetch event received', event.request.url);
  event.respondWith((async () => {
    let response = await caches.match(event.request);
    if (!response) {
      console.log('Cache miss, sending net request...');
      response = await fetch(event.request);
      if (!response || response.status !== 200 || response.type !== 'basic') {
        console.log('Done, but the response is not cacheable');
      } else {
        console.log('Done, caching the response');

        const responseToCache = response.clone();
        const cache = await caches.open(cacheName);
        cache.put(event.request, responseToCache);
      }
    } else {
      console.log('Served from cache');
    }
    return response;
  })());
});
