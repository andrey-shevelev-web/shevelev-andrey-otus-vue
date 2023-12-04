<script setup>
import { ref, reactive, computed, onMounted, provide, inject } from 'vue';
import Product from '@/components/Product.vue';
import ProductForm from '@/components/ProductForm.vue';
import Spinner from '@/components/Spinner.vue';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useProductStore } from '@/stores/ProductStore';

const productStore = useProductStore();
const emit = defineEmits();
// const search = inject('search');

const toast = useToast();

// const products = reactive([]);
// const cartItems = reactive([]);
// const isRequestRunning = ref(false);
// const isVisibleForm = ref(false);

// function addProduct(newProduct) {
//   products.unshift(newProduct);
// }

// function changeVisibleForm(value) {
//   isVisibleForm.value = value;
// }

// provide('products', { products, addProduct });
// provide('isVisibleForm', { isVisibleForm, changeVisibleForm });

const showInfo = message => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: message,
    life: 3000
  });
};

const pageTitle = computed(() => {
  return productStore.isRequestRunning.value
    ? 'Data loading in progress ...'
    : 'Products';
});

// const filteredProducts = computed(() => {
//   const rawSearch = search.value;

//   if (rawSearch) {
//     const priceSearch = Number(rawSearch);

//     return products.filter(
//       o =>
//         o.title.includes(rawSearch) ||
//         (!isNaN(priceSearch) && o.price === priceSearch)
//     );
//   } else {
//     return products;
//   }
// });

// const onAddToCart = productId => {
//   const foundProduct = products.find(o => o.id == productId);
//   if (!foundProduct) return;

//   const newCartItem = {
//     id: uuidv4(),
//     productId,
//     image: foundProduct.image,
//     title: foundProduct.title,
//     price: foundProduct.price,
//     quantity: 1
//   };

//   const foundCartItem = cartItems.find(o => o.productId == productId);
//   if (foundCartItem) {
//     foundCartItem.quantity += 1;
//   } else {
//     cartItems.push(newCartItem);
//   }

//   localStorage.setItem('cart', JSON.stringify(cartItems));

//   showInfo(`Product "${foundProduct.title}" added to Cart`);
// };

onMounted(async () => {
  // isRequestRunning.value = true;

  // const cartFromLS = JSON.parse(localStorage.getItem('cart'));
  // if (cartFromLS) {
  //   cartItems.push(...cartFromLS);
  // }

  // try {
  //   const response = await getProducts();
  //   products.push(...response);
  // } catch (error) {
  //   console.log('Error! Data loading error', error);
  // } finally {
  //   isRequestRunning.value = false;
  // }
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
