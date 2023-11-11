<script setup>
import { ref } from 'vue';

defineProps({
  msg: String
});

const count = ref(0);
const appInfo = ref('New VueJS App');
const appAuthor = ref('Shevelev Andrey');
</script>

<template>
  <h1>{{ appInfo }}</h1>
  <h2>{{ appAuthor }}</h2>
  <h2>{{ msg }}</h2>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
