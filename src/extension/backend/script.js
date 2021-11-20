console.log('Hello from Injected Script');

function detectVue(win) {
  const vueDetected = !!(window.__VUE__);
  if (vueDetected) {
    console.log('Vue3 detected: ', vueDetected);
  } else {
    console.log('Vue3 not detected');
  }
}

detectVue(window);

