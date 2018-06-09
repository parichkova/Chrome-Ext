function makeLongLiveConn() {
    port = chrome.runtime.connect({name: "mycontentscript"});

    port.postMessage({testMsg: "Knock knock"});
    port.onMessage.addListener(function(msg) {
        if (msg) {
            console.log('The message is: ', msg);
        } else {
            console.log('No message');
        }
    });
}

function portListenToMsg() {
    port.onMessage.addListener(function(res, sender, sendRes) {
        if (res) {
            console.log(res, ' received from:', sender);
        }
    });    
}
