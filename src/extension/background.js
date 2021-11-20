/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

chrome.extension.onConnect.addListener((port) => {
  port.onMessage.addListener((message) => {
    // Request a tab for sending needed information
    chrome.tabs.query({
      status: 'complete',
      currentWindow: true,
      url: 'http://www.google.co.in/',
    }, (tabs) => {
      for (const tab in tabs) {
        // Sending Message to content scripts
        chrome.tabs.sendMessage(tabs[tab].id, message);
      }
    });
  });

  // Posting back to Devtools
  chrome.extension.onMessage.addListener((message, sender) => {
    port.postMessage(message);
  });
});
