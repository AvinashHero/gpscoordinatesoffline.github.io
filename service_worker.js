var cacheName = 'ffm-offline-gps-v1';
var cacheAssets = [
    '/offline_gps.php'
];

// Call install Event
self.addEventListener('install', e => {
    // Wait until promise is finished 
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log(`Service Worker: Caching Files: ${cache}`);
            cache.addAll(cacheAssets)
                // When everything is set
                .then(() => self.skipWaiting())
        })
    );
})


// Call Activate Event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    // Clean up old caches by looping through all of the
    // caches and deleting any old caches or caches that
    // are not defined in the list
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(
                    cache => {
                        if (cache !== cacheName) {
                            console.log('Service Worker: Clearing Old Cache');
                            return caches.delete(cache);
                        }
                    }
                )
            )
        })
    );
})

// Call Fetch Event 
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
        .catch(
            err => caches.match(e.request)
            .then(res => res)
        )
    );
});