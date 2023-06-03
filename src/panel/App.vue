<template>
  <nav-bar title="ClearVue"></nav-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './components/NavBar.vue';

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
  },
  mounted() {
    if (process.env.NODE_ENV === 'production') {
      console.log('production mode, loaded in chrome extension');
      // run method for obtaining extension data
      this.$store.commit('initTab');
      const { tabId } = this.$store.state;

      const port = chrome.runtime.connect({ name: `${tabId}` });
      port.onMessage.addListener((message) => {
        console.log('port received message:', message);
        const { action, payload } = message;

        switch (action) {
          case 'updateTree':
            this.$store.commit('updateTree', payload);
            break;
          case 'getVitals':
            console.log('got vitals data:', JSON.parse(payload));
            this.$store.commit('updateVitals', payload);
            break;
          default:
            console.log('received unspecified action on port: ');
        }
      });

      port.postMessage({
        action: 'parseTab',
        tabId,
        message: 'extension dispatch action to parse target tab',
      });

      port.postMessage({
        action: 'getVitals',
        tabId,
        message: 'extension dispatch action to parse target tab',
      });

      this.$store.commit('initPort', port);

      console.log('tabId obtained: ', tabId);
      console.log('port obtained: ', port);
    } else {
      console.log('development mode, loaded in chrome browser tab');
      // run mock data to test in dev server
      this.$store.commit('testLog', 'at App.vue');
    }
  },
});
</script>

<style>
html {
  background-color: #212529;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #212529;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
