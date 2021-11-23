console.log('devTool API:', chrome.devtools.inspectedWindow);

// 'runtime.connect' allows for longer conversations between content script to an extension
// than a one-time request, when establishing a connection, each end is given a runtime.Port
// used for sending and recieving msgs through that connection

const port = chrome.runtime.connect({ name: 'knockknock' });

port.postMessage({ joke: 'Knock knock' });

port.onMessage.addListener((msg) => {
  if (msg.question === "Who's there?") {
    port.postMessage({ answer: 'Madame' });
  } else if (msg.question === 'Madame who?') {
    port.postMessage({ answer: 'Madame... Bovary' });
  }
});
