const CACHE_NAME = 'V1_cache_Calculator_NoleeBH',
  urlsToCache = [
    './',
    './css/style.css',
    './js/app.js',
    './js/css-dynamic.js',
    './img/calculator.png',
    './img/favicon.ico',
    './img/calculator_32.png',
    './img/calculator_64.png',
    './img/calculator_96.png',
    './img/calculator_128.png',
    './img/calculator_192.png',
    './img/calculator_256.png',
    './img/calculator_384.png',
    './img/calculator_512.png',
    './img/calculator_1024.png'
  ]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Cache registration failed', err))
  )
})

self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          return res
        }
        return fetch(e.request)
      })
  )
})