<template>
  <div>Vue app</div>
  <div>{{message}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  data: () => ({
    message: 'Hello from Vue Component',
  }),
});
</script>
