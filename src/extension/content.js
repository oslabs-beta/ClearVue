console.log('Hello from Content Script');

console.log(window);

const script = document.createElement('script');
script.src = chrome.runtime.getURL('backend/script.js');

if (document.doctype) {
  document.documentElement.appendChild(script);
}
