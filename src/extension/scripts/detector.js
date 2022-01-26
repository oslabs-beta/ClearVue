// detector will check for "__VUE__" - a property that exists on Vue 3 web applications
// once detected or not detected, it should pass a message back up to content/background

// console.log('Hello from Detector Script');

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