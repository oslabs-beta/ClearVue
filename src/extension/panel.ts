console.log('devTool API:', chrome.devtools.inspectedWindow);

// 'runtime.connect' allows for longer conversations between content script to an extension
// than a one-time request, when establishing a connection, each end is given a runtime.Port
// used for sending and recieving msgs through that connection

const port = chrome.runtime.connect();

port.postMessage({
  action: 'initPanel',
  message: 'extension dispatch action to init devtool panel',
});

port.onMessage.addListener((msg) => {
  console.log('port received msg:', msg);
  const received = document.createElement('div');
  received.innerHTML = msg.data;
  document.getElementsByTagName('BODY')[0]!.appendChild(received);
});
