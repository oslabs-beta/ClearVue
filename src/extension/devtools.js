let backgroundPageConnection = chrome.runtime.connect({
  name: "devtools-page"
});

chrome.devtools.inspectedWindow.eval(
  '!!(window.__VUE__)',
  (result, isException) => {
    console.log('Vue3 detected in devtool: ', result);
    if (result) {
      chrome.devtools.panels.create('Vue Toolkit', null, 'panel.html');
      chrome.storage.sync.set({ vueDetected: true });
    }
  },
);
