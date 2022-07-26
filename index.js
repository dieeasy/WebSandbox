if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./sw.js").then(function(registration) {
        // registration worked
        console.log('Registration succeeded. Scope is ' + registration.scope);

        console.log( registration.installing,registration.waiting, registration.active)
        navigator.serviceWorker.controller.postMessage('serviceWorker register succeed!!!')


        navigator.serviceWorker.addEventListener('message', function (e) {
            console.log('main thread got message:',e)
        })

        registration.addEventListener('updatefound', function() {
            // If updatefound is fired, it means that there's
            // a new service worker being installed.
            const installingWorker = registration.installing;
            console.log('A new service worker is being installed:',
                installingWorker);

            installingWorker.onstatechange = function () {
                console.log('new service worker onstatechange', installingWorker.state)
            }

            // You can listen for changes to the installing service worker's
            // state via installingWorker.onstatechange
        });

    }).catch(function(error) {
        // registration failed
        console.log('Registration failed with ' + error);
    });


    navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.error('serviceWorker controllerchange!')
    })

}else{
    console.error('no serviceWorker')
}

function doFetch() {
    fetch('./movies.json')
        .then(response => response.json())
        .then(data => console.log(data));

}


function sendMessage() {
    navigator.serviceWorker.controller.postMessage('hey you')
}