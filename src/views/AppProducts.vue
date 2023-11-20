<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import AppProduct from '@/components/AppProduct.vue';
import AppSpinner from '@/components/AppSpinner.vue';
import { getProducts } from '@/services/ProductService';

const products = reactive([]);
const isRequestRunning = ref(false);

const pageTitle = computed(() => {
  return isRequestRunning.value ? 'Data loading in progress ...' : 'Products';
});

onMounted(() => {
  isRequestRunning.value = true;
  setTimeout(() => {
    products.push(...getProducts());
    isRequestRunning.value = false;
  }, 2500);
});
</script>

<template>
  <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
    <div class="text-900 font-bold text-6xl mb-4 text-center">
      {{ pageTitle }}
    </div>
    <div
      class="text-700 text-xl mb-6 text-center line-height-3"
      v-if="!isRequestRunning"
    >
      Only today and only with us!
    </div>

    <div class="grid">
      <AppSpinner v-if="isRequestRunning" />
      <AppProduct
        v-else
        v-for="product in products"
        v-key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
