const APP_PREFIX = 'PWABudgetTracker-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    './index.html',
    './css/styles.css',
    './js/index.js',
    './js/idb.js',
    './manifest.json',
    './icons/icon-512x512.png',
    './icons/icon-384x384.png',
    './icons/icon-192x192.png',
    './icons/icon-152x152.png',
    './icons/icon-144x144.png',
    './icons/icon-128x128.png',
    './icons/icon-96x96.png',
    './icons/icon-72x72.png'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        // Note: we can name CACHE_NAME below "static" too most commonly. 
        // But you can name it anything you like I named it CACHE_NAME
        caches.open(CACHE_NAME).then((cache) => {
            console.log('installing cache here: ' + CACHE_NAME);
            return cache.addAll(FILES_TO_CACHE)
        })
    )
});

// Add event listener
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            let cacheKeeplist = keyList.filter((key) => {
                return key.indexOf(APP_PREFIX);
            });
            cacheKeeplist.push(CACHE_NAME);

            return Promise.all(keyList.map((key, i) => {
                if (cacheKeeplist.indexOf(key) === -1) {
                    console.log('deleting cache : ' + keyList[i] );
                    return caches.delete(keyList[i]);
                }
            }));
        })
    )
});

// listen for fetch event
self.addEventListener('fetch', (e) => {
    console.log('Intercepting fetch request for: ' + e.request.url);
    e.respondWith(
        caches.match(e.request).then((request) => {
            if (request) { // if cache is available there, respond with cache
                console.log('responding with cache here: ' + e.request.url);
                return request
            } else {       // if there is no cache, try fetching request query
                console.log('file is not cached, fetching here: ' + e.request.url);
                return fetch(e.request)
            }

        })
    )
});
