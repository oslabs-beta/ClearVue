<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">
    <img src="../assets/48icon.png" width="30" height="30"
     class="d-inline-block align-top" alt="">
    {{ title }}
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse"
   data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
   aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <router-link class="nav-link" to="/">Tree</router-link>
      <router-link class="nav-link" to="/circle-pack-view">Circle Pack</router-link>
      <router-link class="nav-link" to="/home">Other</router-link>
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
