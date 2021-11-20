chrome.devtools.panels.create('Vue Toolkit', null, 'panel.html');

// eslint-disable-next-line no-console
console.log(chrome);
// Created a port with background page for continous message communication
const port = chrome.extension.connect({
  name: 'Sample communication',
});
port.postMessage('Request Tab Data');
port.onMessage.addListener((msg) => {
  // eslint-disable-next-line no-console
  console.log('tab data recieved is ', msg);
});
