let loaded = false;

//you will see this message on plugin installation
chrome.runtime.onInstalled.addListener(function() {
  alert('Installed');
});

//when clickedx on the extension icon, logic.js code will be executed
chrome.browserAction.onClicked.addListener(function(tab) { 

  alert('Click on the text you would like to translate.');

  if (!loaded) {
    chrome.tabs.executeScript(tab.id, {file: 'dragElementLogic.js'});
    chrome.tabs.executeScript(tab.id, {file: 'logic.js'});  
    chrome.tabs.executeScript(tab.id, {file: 'panelScript.js'});
    
    loaded = true;
  }
});

