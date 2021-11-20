chrome.devtools.panels.create('Vue Toolkit', null, 'panel.html');
let vueDetected = false;

chrome.devtools.inspectedWindow.eval(
  '!!(window.__VUE__)',
  (result, isException) => {
    console.log(result);
    vueDetected = result;
  },
);

if (vueDetected) {
  console.log('inside if');
}