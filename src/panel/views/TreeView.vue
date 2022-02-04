<template>
<div class="container-fluid">
  <div class="row">
    <div class="container-fluid scrollable">
    <vertical-tree v-if="($store.state.treeData.length !== 0) || isDevMode"></vertical-tree>
    </div>
  </div>
  <div>
    <div class="row" id="bottom-row-display">
      <div class="col gy-4">
        <!-- add accordions -->
        <div class="accordion bg-dark" id="accordionDisplay">
          <!-- accordion item for props -->
          <div class="accordion-item bg-dark">
            <h2 class="accordion-header"
                id="headingOne">
              <button class="accordion-button bg-dark text-light collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne">
                Props
              </button>
            </h2>
            <div  id="collapseOne"
                  class="accordion-collapse text-light collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionDisplay">
              <div class="accordion-body">
                {{ activeProps }}
              </div>
            </div>
          </div>
            <!-- accordion item for data -->
          <div class="accordion-item bg-dark">
            <h2 class="accordion-header"
                id="headingTwo">
              <button class="accordion-button bg-dark text-light collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo">
                Data
              </button>
            </h2>
            <div  id="collapseTwo"
                  class="accordion-collapse text-light collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionEx">
              <div class="accordion-body">
                {{ activeData }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VerticalTree from '../components/VerticalTree.vue';

export default defineComponent({
  name: 'TreeView',
  components: {
    VerticalTree,
  },
  computed: {
    activeData() {
      return this.$store.state.activeData;
    },
    activeProps() {
      return this.$store.state.activeProps;
    },
    isDevMode() {
      return this.$store.getters.isDevMode;
    },
  },
});
</script>

<style>
  #bottom-row-display {
    min-height: 160px;
    border-style: ridge;
    border-color: LightSlateGray;
  }
  /* .scrollable {
    overflow-x: scroll;
    overflow-y: scroll;
  } */
</style>
