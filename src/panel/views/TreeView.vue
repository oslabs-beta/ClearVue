<template>
<div class="container-fluid">
  <div class="row">
    <div class="container-fluid">
    </div>
    <vertical-tree v-if="($store.state.treeData.length !== 0) || isDevMode"></vertical-tree>
  </div>
  <div>
    <div class="row">
      <div class="col">Bottom Left Div
        <!-- add accordians -->
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header"
                id="headingOne">
              <button class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne">
                Props
              </button>
            </h2>
            <div id="collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample">
              <div class="accordion-body">
                props from parsed data goes here
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">Bottom Right Div</div>
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
    isDevMode() {
      return this.$store.getters.isDevMode;
    },
  },
});
</script>

<style>
  .col {
    min-height: 200px;
    border-style: ridge
  }
  .dark-mode {
  background-color: black;
  color: #42b883;
}
</style>
