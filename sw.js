self.addEventListener('install', function (event) {
    console.error('sw installed')
});

self.addEventListener('activate', function (event) {
    console.error('sw activate')
    self.clients.claim();
});

self.addEventListener('message', function (event) {
    console.error('sw got message', event)

    console.error(event.source.id)
    self.clients.get(event.source.id).then(function (client) {
        client.postMessage("copy ! :" + event.data);
    });
});


self.addEventListener('fetch', async function (event) {
    const request = event.request
    console.error('sw fetch :', event.request)

    const responseBody = {}

    if (event.request.url.endsWith('sandbox-fake-sync-url.html')) {
        try {
            const {args, code} = await request.clone().json()

            const handler = new Function('return ' + code)()
            responseBody.result = handler(...args)
        } catch (e) {
            responseBody.error = e
        }
        event.respondWith(new Response(JSON.stringify(responseBody),{headers:{
                'status' : 200,
                'content-type': 'application/json',
                'Cache-Control': 'no-store',
            }}));
    } else {
        event.respondWith(fetch(event.request))
    }
});
