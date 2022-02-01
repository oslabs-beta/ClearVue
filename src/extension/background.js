// Background script is running in the background of the chrome browser listening
// and handling events triggerd. Our background script will mostly listen for events
// coming from the devtool extension as well as those from the inspected window.
// console.log('Hello from Background Service Worker');

const ports = {};

// Listener for receiving message from inspected window
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message from content script: ', message);
  console.log('From sender: ', sender.tab);
  const { action, payload } = message;
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
    case 'updateTree':
      const targetPort = ports[tab.id];
      console.log('sending tree data to port: ', targetPort);
      targetPort.postMessage({
        action,
        payload,
      });
      break;
    default:
      console.log('default case: nonspecified action');
  }
});

// Listener for receiving message from devtool extension (devtool and panel)
chrome.runtime.onConnect.addListener((port) => {
  console.log('newly connected port: ', port);
  // tabId is used stored as port.name, used to uniquely identify each port
  const portId = parseInt(port.name);
  ports[portId] = port;

  port.onMessage.addListener((message) => {
    const { action, payload, tabId } = message;
    console.log('Received message from connected port: ', message);

    switch (action) {
      case 'parseTab':
        console.log('injecting parser script to tab: ', tabId);
        // chrome.tabs.sendMessage(tabId, { tabId, action });
        chrome.scripting.executeScript({
          target: { tabId },
          function: () => {
            const script = document.createElement('script');
            script.src = chrome.runtime.getURL('scripts/parser.js');
            if (document.doctype) {
              document.documentElement.appendChild(script);
            }
          },
        });
        break;
      default:
        console.log('default case: nonspecified action');
    }
  });
});
