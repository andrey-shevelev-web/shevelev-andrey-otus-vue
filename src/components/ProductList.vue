<script setup>
import { computed, onMounted } from 'vue';
import Product from '@/components/Product.vue';
import ProductForm from '@/components/ProductForm.vue';
import Spinner from '@/components/Spinner.vue';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useProductStore } from '@/stores/ProductStore';

const productStore = useProductStore();

const pageTitle = computed(() => {
  return productStore.isRequestRunning.value
    ? 'Data loading in progress ...'
    : 'Products';
});

onMounted(async () => {
  await productStore.loadProducts();
});
</script>

<template>
  <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
    <div class="text-900 font-bold text-6xl mb-4 text-center">
      {{ pageTitle }}
    </div>

    <Toolbar>
      <template #start>
        <Button
          label="Create Product"
          icon="pi pi-plus"
          :disabled="productStore.isRequestRunning"
          @click="productStore.setVisibleCreateForm(true)"
        />
      </template>
    </Toolbar>

    <ProductForm v-if="productStore.isVisibleCreateForm" />
    <div class="grid">
      <Spinner v-if="productStore.isRequestRunning" class="my-4" />
      <template v-else>
        <Product
          v-for="product in productStore.filteredProducts"
          :key="product.id"
          :product="product"
        />
      </template>
    </div>
  </div>
  <Toast />
</template>
