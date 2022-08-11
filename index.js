function ready() {
    return new Promise((resolve, reject) => {
        navigator.serviceWorker.register("./sw.js").then(function (registration) {
            // registration worked
            console.log('Registration succeeded. Scope is ' + registration.scope);

            if (registration.active) {
                resolve()
            } else if (registration.installing) {
                registration.installing.addEventListener('statechange', function (ev) {
                    if (ev.target.state === 'activated') {
                        resolve()
                    }
                });
            } else if (registration.waiting) {
                // update situation ignored
            }


            navigator.serviceWorker.addEventListener('message', function (e) {
                console.log('main thread got message:', e)
            })

        }).catch(function (error) {
            // registration failed
            console.log('Registration failed with ' + error);
        });
    })
}

ready().then(() => {
    console.error('ready!!')
})

function sandbox() {
    return syncSendMessageToServiceWorker({
        args: [1,3],
        code: '(a,b)=>a+b '
    })
}


function syncSendMessageToServiceWorker(body) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', './sandbox-fake-sync-url.html', false);
    xhr.send(JSON.stringify(body));
    // look ma, i'm synchronous (•‿•)
    return xhr.responseText;
}

function doFetch() {

    console.error(sandbox())
}


function sendMessage() {
    fetch('./movies.json')
    // navigator.serviceWorker.controller.postMessage('hey you')
}