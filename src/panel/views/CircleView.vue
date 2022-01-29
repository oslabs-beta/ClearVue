<template>
  <div class="container-fluid">
    <div class="row gx-0">
      <div>Render Circle Pack here</div>
      <!-- <circle-pack></circle-pack> -->
      <zoomable-circle-pack></zoomable-circle-pack>
    </div>
  </div>
</template>

<script>
// import CirclePack from '../components/CirclePack.vue';
import ZoomableCirclePack from '../components/ZoomableCirclePack.vue';

export default {
  components: {
    // CirclePack,
    ZoomableCirclePack,
  },
};
</script>
