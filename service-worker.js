importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox){
  console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([
      { url: './', revision: '1' },
      { url: './manifest.json', revision: '1' },
      { url: './index.html', revision: '1' },
      { url: './about.html', revision: '1' },
      { url: './contact.html', revision: '1' },
      { url: './gallery.html', revision: '1' }]);

  workbox.routing.registerRoute(
      /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
      workbox.strategies.cacheFirst({
          cacheName: 'images-cache',
          plugins: [
          new workbox.cacheableResponse.Plugin({
              statuses: [0, 200]
          }),
          new workbox.expiration.Plugin({
              maxEntries: 100,
              maxAgeSeconds: 30 * 24 * 60 * 60,
          }),
          ]
      })
      );


    
    workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources',
    })
    );

    

}else{
  console.log(`Workbox gagal dimuat`);
}
