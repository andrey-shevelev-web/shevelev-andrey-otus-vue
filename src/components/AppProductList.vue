<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import AppProduct from '@/components/AppProduct.vue';
import AppAddProduct from '@/components/AppAddProduct.vue';
import AppOrder from '@/components/AppOrder.vue';
import AppSpinner from '@/components/AppSpinner.vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { getProducts } from '@/services/ProductService';

const props = defineProps([
  'search',
  'hiddenAddProductForm',
  'hiddenOrderForm'
]);
const emit = defineEmits();

const toast = useToast();

const products = reactive([]);
const isRequestRunning = ref(false);

const onAddProduct = event => {
  if (event) {
    products.unshift(event);
  }
  emit('setHiddenAddProductForm', true);
};

const showInfo = message => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: message,
    life: 3000
  });
};

const onOrderFormSubmitted = () => {
  showInfo('Form submitted successfully');
};
const onSetHiddenOrderForm = event => {
  emit('setHiddenOrderForm', event);
};

const pageTitle = computed(() => {
  return isRequestRunning.value ? 'Data loading in progress ...' : 'Products';
});

const filteredProducts = computed(() => {
  if (props.search) {
    return products.filter(
      o => o.title.includes(props.search) || o.price == props.search
    );
  } else {
    return products;
  }
});

onMounted(async () => {
  isRequestRunning.value = true;
  try {
    const response = await getProducts();
    products.push(...response);
  } catch (error) {
    console.log('Error! Data loading error', error);
  } finally {
    isRequestRunning.value = false;
  }
});
</script>

<template>
  <AppOrder
    v-if="!props.hiddenOrderForm"
    @setHiddenOrderForm="onSetHiddenOrderForm"
    @orderFormSubmitted="onOrderFormSubmitted"
  />
  <AppAddProduct
    v-if="!props.hiddenAddProductForm"
    @add-product="onAddProduct"
  />
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
      <template v-else>
        <AppProduct
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </template>
    </div>
  </div>
  <Toast />
</template>
