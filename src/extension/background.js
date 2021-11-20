console.log('Hello from Background Service Worker');

chrome.tabs.onActivated.addListener((tab) => {
  console.log('Updated tab');
  console.log(tab);
  chrome.scripting.executeScript({
    target: { tabId: tab.tabId },
    files: ['content.js'],
  });
});
