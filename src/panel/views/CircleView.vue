<template>
  <div class="container-fluid">
    <div class="row gx-0">
      <div class="col">
        Left Column
        <div class="container-fluid">
          <div>Render Circle Pack here</div>
          <!-- <circle-pack></circle-pack> -->
          <zoomable-circle-pack></zoomable-circle-pack>
        </div>
      </div>
      <div class="col">
        Right Column
        <div class="container-fluid">
          <div class="right-col-panels">Top Right Div</div>
          <div class="right-col-panels">Bottom Right Div</div>
        </div>
      </div>
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
