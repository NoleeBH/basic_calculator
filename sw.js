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

 //durante la fase de instalación, generalmente se almacena en caché los activos estáticos
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

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})