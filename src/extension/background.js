// Background script is running in the background of the chrome browser listening
// and handling events triggerd. Our background script will mostly listen for events
// coming from the devtool extension as well as those from the inspected window.
// console.log('Hello from Background Service Worker');

const ports = [];

// Listener for receiving message from content script (inspected window)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message from content script: ', message);

  const { action, data } = message;
  const { tab } = sender;

  switch (action) {
    case 'detectVue':
      // if the message we receive from content script asks us to detect vue
      console.log('run script for detecting vue');
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          const script = document.createElement('script');
          script.src = chrome.runtime.getURL('scripts/detector.js');
          if (document.doctype) {
            document.documentElement.appendChild(script);
          }
        },
      });
      break;
    case 'parseTree':
      // if the message we receive from content script asks us to parse dom tree
      console.log('run script for parsing and processing tree');
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          const script = document.createElement('script');
          script.src = chrome.runtime.getURL('scripts/parser.js');
          if (document.doctype) {
            document.documentElement.appendChild(script);
          }
        },
      });
      break;
    case 'updateDevtool':
      // if the message we receive asks us to update the devtool with received data
      ports.forEach((port) => {
        port.postMessage({
          action: 'updateData',
          data,
        });
      });
      break;
    default:
      console.log('default case: nonspecified action');
  }
});

// Listener for receiving message from devtool extension (devtool and panel)
chrome.runtime.onConnect.addListener((port) => {
  console.log('port is: ', port);
  ports.push(port);
  port.onMessage.addListener((message) => {
    const { action, payload } = message;
    console.log('Received message from connected port: ', message);

    switch (action) {
      case 'initPanel':
        console.log('sending data to panel');
        port.postMessage({
          action: 'initPanel',
          data: 'tree data placeholder',
        });
        break;

      default:
        console.log('default case: nonspecified action');
    }
  });
});
