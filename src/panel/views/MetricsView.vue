<template>
  <div class="home">
    <div>
      <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Metrics</th>
      <th scope="col">Time (ms)</th>
      <th scope="col">Passable Threshold</th>
      <th scope="col">Critical Threshold</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">CLS</th>
      <td>{{ metrics['CLS'] }}</td>
      <td>100 ms</td>
      <td>250 ms</td>
    </tr>
    <tr>
      <th scope="row">FCP</th>
      <td>{{ metrics.FCP }}</td>
      <td>1800 ms</td>
      <td>3000 ms</td>
    </tr>
    <tr>
      <th scope="row">LCP</th>
      <td>{{ metrics.LCP }}</td>
      <td>2500 ms</td>
      <td>4000 ms</td>
    </tr>
    <tr>
      <th scope="row">TTFB</th>
      <td>{{ metrics.TTFB }}</td>
      <td>100 ms</td>
      <td>500 ms</td>
    </tr>
    <tr>
    <th scope="row">FID</th>
      <td>{{ metrics.FID }}</td>
      <td>100 ms</td>
      <td>300 ms</td>
    </tr>
  </tbody>
</table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Metrics',
  computed: {
    metrics() {
      return this.$store.state.webVitals;
    },
  },
});
</script>
