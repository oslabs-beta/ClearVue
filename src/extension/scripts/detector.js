// detector will check for "__VUE__" - a property that exists on Vue 3 web applications
// once detected or not detected, it should pass a message back up to content/background

console.log('Hello from Detector Script');

function detectVue(win) {
  const vueDetected = !!window.__VUE__;
  if (vueDetected) {
    console.log('Vue3 detected: ', vueDetected);
  } else {
    console.log('Vue3 not detected');
  }
  return vueDetected;
}

const hasVue = detectVue(window);

// post message allows communication between pages and popups and/or devtools
// this message will send whether Vue3 was detected to 'content.js'
window.postMessage({
  type: 'VueToolkit',
  action: 'detectVue',
  vueDetected: hasVue,
});
