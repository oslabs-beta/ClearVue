console.log('Hello from Content Script');

const script = document.createElement('script');
script.src = chrome.runtime.getURL('backend/script.js');

if (document.doctype) {
  document.documentElement.appendChild(script);
}
