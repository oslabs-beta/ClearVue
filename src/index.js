import Vue from 'vue';
import App from './App.vue';

console.log('App: ', App);
// eslint-disable-next-line no-new
// new Vue({
//   el: '#app',
//   data: () => ({
//     message: 'Hello from vue',
//   }),
//   render: (h) => h(App),
// });

const app = Vue.createApp({
  el: '#app',
  data: () => ({
    message: 'Hello from vue',
  }),
  render: (h) => h(App),
});

app.mount('#app');

console.log('app: ', app);
