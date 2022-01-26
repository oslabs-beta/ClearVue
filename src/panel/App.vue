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
  mounted() {
    if (process.env.NODE_ENV === 'production') {
      console.log('production mode, loaded in extension');
      // run method for obtaining extension data
      this.$store.commit('initConnection');
      const { tabId, port } = this.$store.state;

      console.log('tabId obtained: ', tabId);
      console.log('port obtained: ', port);
    } else {
      console.log('development mode, loaded in chrome');
      // run mock data to test in dev server
      this.$store.commit('testLog', 'at App.vue');
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
