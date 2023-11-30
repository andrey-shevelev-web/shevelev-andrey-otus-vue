<script setup>
import { ref, watch } from 'vue';
import Button from 'primevue/button';
import Search from '@/components/Search.vue';

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
        <div class="text-2xl font-medium text-white">DEMO SHOP</div>
      </div>

      <div class="flex align-items-center">
        <Button
          label="Add product"
          icon="pi pi-plus"
          class="mr-4"
          @click="$emit('setHiddenAddProductForm', false)"
        ></Button>
        <Button
          label="Send order"
          icon="pi pi-file-export"
          class="mr-4"
          @click="$emit('setHiddenOrderForm', false)"
        ></Button>
        <Search v-model="search" />
      </div>
    </div>
  </div>
</template>
