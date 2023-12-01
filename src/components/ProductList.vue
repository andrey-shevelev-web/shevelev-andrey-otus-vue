<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import Product from '@/components/Product.vue';
import ProductForm from '@/components/ProductForm.vue';
import OrderForm from '@/components/OrderForm.vue';
import Spinner from '@/components/Spinner.vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { v4 as uuidv4 } from 'uuid';
import { getProducts } from '@/services/ProductService';

const props = defineProps([
  'search',
  'hiddenAddProductForm',
  'hiddenOrderForm'
]);
const emit = defineEmits();

const toast = useToast();

const products = reactive([]);
const cartItems = reactive([]);
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
    const priceSearch = Number(props.search);

    return products.filter(
      o =>
        o.title.includes(props.search) ||
        (!isNaN(priceSearch) && o.price === priceSearch)
    );
  } else {
    return products;
  }
});

const onAddToCart = productId => {
  const foundProduct = products.find(o => o.id == productId);
  if (!foundProduct) return;

  const newCartItem = {
    id: uuidv4(),
    productId,
    image: foundProduct.image,
    title: foundProduct.title,
    price: foundProduct.price,
    quantity: 1
  };

  const foundCartItem = cartItems.find(o => o.productId == productId);
  if (foundCartItem) {
    foundCartItem.quantity += 1;
  } else {
    cartItems.push(newCartItem);
  }

  localStorage.setItem('cart', JSON.stringify(cartItems));
};

onMounted(async () => {
  isRequestRunning.value = true;

  const cartFromLS = JSON.parse(localStorage.getItem('cart'));
  if (cartFromLS) {
    cartItems.push(...cartFromLS);
  }

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
  <OrderForm
    v-if="!props.hiddenOrderForm"
    @setHiddenOrderForm="onSetHiddenOrderForm"
    @orderFormSubmitted="onOrderFormSubmitted"
  />
  <ProductForm v-if="!props.hiddenAddProductForm" @add-product="onAddProduct" />
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
      <Spinner v-if="isRequestRunning" />
      <template v-else>
        <Product
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @addToCart="onAddToCart"
        />
      </template>
    </div>
  </div>
  <Toast />
</template>
