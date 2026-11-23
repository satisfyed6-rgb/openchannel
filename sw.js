/* OpenChannel prototype service worker: offline app shell only.
   Network-first for HTML so updates reach installed copies; cache-first for icons.
   Never caches the signaling channel or the PeerJS CDN (cross-origin). */
var CACHE = 'oc27-v37'
var SHELL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './sfx-press.mp3', './sfx-beep.mp3', './sfx-click.mp3', './sfx-tail.mp3', './sfx-static.mp3', './sfx-release.mp3', './sfx-incoming.mp3', './beeps/clip1.mp3', './beeps/clip2.mp3', './beeps/clip3.mp3', './beeps/clip4.mp3'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  var isHtml = e.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('/');
  if (isHtml) {
    e.respondWith(
      fetch(e.request).then(function (resp) {
        var copy = resp.clone();
        caches.open(CACHE).then(function (c) { if(resp.ok)c.put(e.request, copy); });
        return resp;
      }).catch(function () { return caches.match(e.request).then(function (r) { return r || caches.match('./index.html'); }); })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function (hit) {
        return (hit&&hit.ok?hit:null) || fetch(e.request).then(function (resp) {
          var copy = resp.clone();
          caches.open(CACHE).then(function (c) { if(resp.ok)c.put(e.request, copy); });
          return resp;
        }).catch(function () { return caches.match('./index.html'); });
      })
    );
  }
});
