chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
 // if (response === 'buttonClicked') {
      chrome.runtime.sendMessage('tish mish');
  //}

 // alert(response);
})

chrome.runtime.sendMessage('test');
