<template>
  <div class="container-fluid">
    <div class="row gx-0">
      <zoomable-circle-pack></zoomable-circle-pack>
    </div>
  </div>
</template>

<script lang="ts">
import ZoomableCirclePack from '../components/ZoomableCirclePack.vue';

export default {
  components: {
    ZoomableCirclePack,
  },
};
</script>
