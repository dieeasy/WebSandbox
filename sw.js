self.addEventListener('install', function(event) {
    console.error('sw installed')
});

self.addEventListener('activate', function(event) {
    console.error('sw activate,123456')
});

self.addEventListener('fetch', function(event) {
    console.error('sw fetch',event.request)

    if(event.request.url.endsWith('.json') || event.request.url.endsWith('.png') ){
        event.respondWith(Promise.resolve(new Response(JSON.stringify({text:'Hello from your friendly neighbourhood service worker!'}))));
    }else{
        event.respondWith( fetch(event.request))
    }
});
