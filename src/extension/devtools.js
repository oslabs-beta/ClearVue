// A DevTools extension adds functionality to the Chrome DevTools.
// DevTool extensions have access to DevTool extension APIs and
// interact with the inspected window.

// An instance of the extension's DevTools page is created each time a
// DevTools window opens. The DevTools page exists for the lifetime of
// the DevTools window. It has access to the same subset of the extension and
// runtime APIs that a content script has access to. Like a content script, a
// DevTools page can communicate with the background page using Message Passing.

chrome.devtools.panels.create('Vue Toolkit', null, '/dist/index.html');
chrome.storage.sync.set({ vueDetected: true });
