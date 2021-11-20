chrome.extension.onMessage.addListener((message, sender) => {
  // eslint-disable-next-line no-console
  console.log('in the content-script message received is ', message);
  chrome.extension.sendMessage('My URL is ', window.location.origin);
});
