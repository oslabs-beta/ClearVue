console.log('Hello from Background Service Worker');

// event listener that is waiting for user to switch tabs to activate,
// once event is listened to, it will run info/data in 'content.js'

// chrome.tabs.onActivated.addListener((tab) => {
//   console.log('Updated tab');
//   console.log(tab);
//   chrome.scripting.executeScript({
//     target: { tabId: tab.tabId },
//     files: ['content.js'],
//   });
// });

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    console.log('recieved msg from content.js to background:', msg);
  });
});
