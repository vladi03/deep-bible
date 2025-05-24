// Service Worker for caching /data/articles.json and updating in background
const CACHE_NAME = 'articles-cache-v1';
const ARTICLES_URL = '/data/articles.json';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.add(ARTICLES_URL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  if (event.request.url.endsWith(ARTICLES_URL)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(response => {
          const fetchPromise = fetch(event.request).then(networkResponse => {
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
          // Return cached response immediately, update in background
          return response || fetchPromise;
        })
      )
    );
  }
});

// Listen for message to check for new data after page render
self.addEventListener('message', event => {
  if (event.data === 'checkForNewArticles') {
    fetch(ARTICLES_URL)
      .then(res => res.json())
      .then(newData => {
        caches.open(CACHE_NAME).then(cache => {
          cache.match(ARTICLES_URL).then(response => {
            if (!response) return;
            response.json().then(cachedData => {
              if (JSON.stringify(newData) !== JSON.stringify(cachedData)) {
                cache.put(ARTICLES_URL, new Response(JSON.stringify(newData)));
                // Notify clients
                self.clients.matchAll().then(clients => {
                  clients.forEach(client => client.postMessage({ type: 'articles-updated' }));
                });
              }
            });
          });
        });
      });
  }
});
