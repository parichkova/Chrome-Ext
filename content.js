/*
port.onMessage.addListener(function(message,sender){
    alert(message.greeting);
});
*/

let port = chrome.runtime.connect({name:"mycontentscript"});

//alert(port);
port.onMessage.addListener(function(res, sender, sendRes) {
    if (res.enableListeners) {
        document.addEventListener('click', function(e){
            let target = e.target;
            let targetContent = target.innerText;
            const modal = document.createElement('div');
        
            modal.style.width = 50 + 'px';
            modal.style.height = 100 + 'px';
            modal.classList.add('tish');
            modal.style.backgroundColor = 'green';
            modal.style.position = 'fixed';
            modal.style.top = 25 + '%';
        
            if (targetContent) {
                document.documentElement.appendChild(modal);
            }
        })
    }
});

