<template>
<nav class="navbar navbar-expand navbar-dark bg-dark">
  <!-- <button class="navbar-toggler" type="button" data-toggle="collapse"
   data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
   aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button> -->
  <a class="navbar-brand" href="#">
    <img src="../assets/img/48icon.png" width="30" height="30"
     class="d-inline-block align-top" alt="ClearVue Logo">
    {{ title }}
  </a>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <router-link class="nav-link" to="/">
        <img src='../assets/img/tree-icon.svg' alt='tree diagram icon'/>
        Hierarchy
      </router-link>
      <router-link class="nav-link" to="/circle-pack-view">
        <img src='../assets/img/icon-circle-pack.svg' alt='circle pack diagram icon'/>
        Composition
      </router-link>
        <router-link class="nav-link" to="/metrics">
        <img src='../assets/img/icon-circle-pack.svg' alt='circle pack diagram icon'/>
        Metrics
      </router-link>
    </div>
  </div>
</nav>
  <router-view/>
</template>

<script>
export default {
  props: ['title'],
};
</script>
