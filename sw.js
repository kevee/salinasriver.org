const CACHE_NAME = 'salinas-river-v2'
const STATIC_ASSETS = [
  '/assets/leaflet/leaflet-global.js',
  '/assets/leaflet/leaflet.css',
  '/assets/river.json',
  '/assets/fonts/open-sans-latin.woff2',
  '/assets/fonts/open-sans-latin-ext.woff2',
  '/assets/fonts/poppins-latin.woff2',
  '/assets/fonts/poppins-latin-ext.woff2',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // Cache-first for static assets, fonts, and map tiles
  if (
    url.pathname.startsWith('/assets/') ||
    url.hostname.includes('cartodb-basemaps') ||
    url.hostname === 'server.arcgisonline.com'
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
          }
          return response
        })
      })
    )
    return
  }

  // Network-first for HTML pages (so gauge data stays fresh)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
          return response
        })
        .catch(() => caches.match(event.request))
    )
    return
  }
})
