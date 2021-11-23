console.log('Hello from Content Script');

// this content script is appending a script tag onto the DOM,
// pulling in code/data from 'backend/script.js'

const script = document.createElement('script');
script.src = chrome.runtime.getURL('backend/script.js');

if (document.doctype) {
  document.documentElement.appendChild(script);
}
// event listener waiting for a message to be passed back from 'backend/script.js'
window.addEventListener('message', (body) => {
  console.log('Received message from injected: ', body);
});

// // 'runtime.connect' allows for longer conversations between content script to an extension
// // than a one-time request, when establishing a connection, each end is given a runtime.Port
// // used for sending and recieving msgs through that connection

// const port = chrome.runtime.connect({ name: 'knockknock' });

// port.postMessage({ joke: 'Knock knock' });

// port.onMessage.addListener((msg) => {
//   if (msg.question === "Who's there?") {
//     port.postMessage({ answer: 'Madame' });
//   } else if (msg.question === 'Madame who?') {
//     port.postMessage({ answer: 'Madame... Bovary' });
//   }
// });

chrome.runtime.onConnect.addListener((e) => {
  console.log('onConnect: ', e);
});
