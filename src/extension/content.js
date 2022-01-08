// Content scripts are files that run in the context of web pages (inspected windows).
// By using the standard Document Object Model (DOM), they are able to read details of
// the web pages the browser visits, make changes to them, and pass information to their
// parent extension. Our content scripts set up message passing wit extension background script.
console.log('Hello from Content Script');

// event listener for window in context of target web page (inspected window)
// event listener waiting for a message to be passed back from 'backend/detector.js'
window.addEventListener('message', (e) => {
  if (e.type == 'VueToolkit') {
    console.log('Received message from injected: ', e);
  }
});

// event listener for messages from extension background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message from background: ', message);
});

chrome.runtime.sendMessage({ action: 'detectVue' });
