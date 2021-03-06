// Content scripts are files that run in the context of web pages (inspected windows).
// By using the standard Document Object Model (DOM), they are able to read details of
// the web pages the browser visits, make changes to them, and pass information to their
// parent extension. Our content scripts set up message passing wit extension background script.
// console.log('Hello from Content Script');

// event listener for window in context of target web page (inspected window)
// event listener waiting for a message to be passed back from 'backend/detector.js'
import {
  getLCP, getFID, getCLS, getTTFB, getFCP,
} from 'web-vitals';

const metrics = {
  CLS: 0,
  FID: 0,
  LCP: 0,
  TTFB: 0,
  FCP: 0,
};

const gatherMetrics = ({ name, value }) => {
  metrics[name] = value;
};

getCLS(gatherMetrics);
getFID(gatherMetrics);
getLCP(gatherMetrics);
getTTFB(gatherMetrics);
getFCP(gatherMetrics);
console.log(metrics);

window.addEventListener('message', (e) => {
  if (e.data.type === 'clearVue') {
    console.log('received clearVue message on content script listener: ', e);
    const { action, payload } = e.data;

    chrome.runtime.sendMessage({ action, payload });
  }
});

// event listener for messages from extension background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message from background: ', message);
  const { tabId, action } = message;

  switch (action) {
    case 'getVitals':
      chrome.runtime.sendMessage({ tabId, action, payload: JSON.stringify(metrics) });
      break;
    default:
      console.log('unsupported action received on content script');
  }
});

chrome.runtime.sendMessage({ action: 'detectVue' });
