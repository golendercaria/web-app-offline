var filesToCache = [
	'/',
	'/index.html'
	//'/offline/',
	//'/style.css',
	//'/logo.png'
];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('appsOfflineCache').then(function(cache) {
			return cache.addAll(filesToCache);
		})
	);
});

var bad_url = ["/wp-admin/","/recaptcha/"];

self.addEventListener('fetch', function(event) {

	var good_url = true;
	for(var i in bad_url){
		if( event.request.url.indexOf(bad_url[i]) != -1 ){
			good_url = false;
			break;
		}
	}
	
	if( !good_url ){
		return false;
	}
	
	
	
  event.respondWith(
    caches.open('appsOfflineCache').then(function(cache) {
      return cache.match(event.request).then(function(response) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        return response || fetchPromise;
      }).catch(function(){
	      return caches.match('/index.js')
      })
    })
  );
});
