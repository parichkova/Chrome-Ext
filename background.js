//you will see this message on plugin installation

chrome.runtime.onInstalled.addListener(function() {
  alert('Installed');
});

//when clickedx on the extension icon, logic.js code will be executed
chrome.browserAction.onClicked.addListener(function(tab) { 
  //alert('icon clicked');
  chrome.tabs.executeScript(tab.id, {file: 'logic.js'});

});

