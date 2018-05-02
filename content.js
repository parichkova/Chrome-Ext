/*window.onload = function() {
    var port = chrome.extension.connect({ name: "color-divs-port" });
    document.getElementById("button").onclick = function() {
        port.postMessage({ type: "color-divs"});
    }
}*/

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.type) {
        case "colors-div":
            var divs = document.querySelectorAll("div");
            if(divs.length === 0) {
                alert("There are no any divs in the page.");
            } else {
                for(var i=0; i < divs.length; i++) {
                    divs[i].style.backgroundColor = message.color;
                }
            }
        break;
    }
});