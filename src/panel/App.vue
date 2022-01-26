<template>
  <nav-bar title="Vue Toolkit"></nav-bar>
</template>

<script>
import { defineComponent } from 'vue';
import NavBar from './components/NavBar.vue';

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
  },
  data() {
    return {
      sample: 1,
      testData: '',
      tabId: -1,
    };
  },
  mounted() {
    this.sample = this.$store.state.tabId;
    if (process.env.NODE_ENV === 'production') {
      console.log('production mode, loaded in extension');
      // run method for obtaining extension data
      const { tabId } = chrome.devtools.inspectedWindow;
      console.log('tabId obtained: ', tabId);
      this.tabId = tabId;

      const port = chrome.runtime.connect();
      port.postMessage({
        action: 'initPanel',
        tabId,
        message: 'extension dispatch action to init devtool panel',
      });
      port.onMessage.addListener((msg) => {
        console.log('port received msg:', msg);
        this.testData = msg.data;
      });
    } else {
      console.log('development mode, loaded in chrome');
      // run mock data to test in dev server
    }
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
