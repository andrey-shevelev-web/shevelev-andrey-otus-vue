<script setup>
import { ref, watch, defineEmits } from 'vue';
import AppSearch from '@/components/AppSearch.vue';

const emit = defineEmits();
const search = ref('');

watch(search, (newSearchValue, oldSearchValue) => {
  emit('setSearchValue', newSearchValue);
});
</script>

<template>
  <div class="mb-2 p-2 bg-primary text-white">
    <div class="flex align-items-center justify-content-between flex-wrap px-3">
      <div class="flex align-items-center">
        <div class="text-2xl font-medium text-white">OTUS VUE.JS</div>
      </div>

      <div class="flex align-items-center">
        <AppSearch v-model="search" />
      </div>
    </div>
  </div>
</template>
