document.addEventListener('DOMContentLoaded', function() {
    let button = document.getElementById('clickme');
    console.log('added');
    if (button) {
        console.log('ima');
        button.addEventListener('click', function(e){
            console.log('raboti');
            chrome.runtime.sendMessage('buttonClicked');
        //    port.postMessage({greeting: "Please, work"});
        })
    }
})