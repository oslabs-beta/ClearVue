<template>
  <nav class="navbar navbar-dark bg-dark">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="navbar-brand" href="#">
          <img src="../assets/48icon.png" width="30" height="30" alt="">
          {{ title }}
        </a>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/">App</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/home">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/about">About</router-link>
      </li>
    </ul>
  </nav>
  <router-view/>
</template>

<script>
export default {
  props: ['title'],
};
</script>
