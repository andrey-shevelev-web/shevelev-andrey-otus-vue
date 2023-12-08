<script setup>
import Search from '@/components/Search.vue';
import { getUsername, authSignout } from '@/services/AuthService';
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/ProductStore';
import { useCartStore } from '@/stores/CartStore';

const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();

const onSignout = () => {
  authSignout();
  router.push({ name: 'Signin' });
};
</script>

<template>
  <div class="mb-2 p-2 bg-primary text-white">
    <div class="flex align-items-center justify-content-between flex-wrap px-3">
      <div class="flex align-items-center">
        <div class="text-2xl font-medium text-white">DEMO SHOP</div>
      </div>

      <div class="flex align-items-center">
        <router-link
          :to="{ name: 'ProductList' }"
          class="mr-4 no-underline text-white transition-colors transition-ease-in transition-duration-300 hover:text-yellow-300"
        >
          <i class="pi pi-fw pi-home mr-2" />
          <span>Products</span>
        </router-link>
        <Search v-model="productStore.productsFilter" class="mr-4" />
        <router-link
          :to="{ name: 'Cart' }"
          class="mr-4 no-underline text-white transition-colors transition-ease-in transition-duration-300 hover:text-yellow-300"
        >
          <i class="pi pi-fw pi-cart-plus mr-2" />
          <span>Cart [{{ cartStore.cartTotalQuantity }}]</span>
        </router-link>
        <div
          class="text-center mr-4 transition-colors transition-ease-in transition-duration-300 hover:text-yellow-300"
        >
          <i class="pi pi-fw pi-user mr-2" />
          <span>{{ getUsername() }}</span>
        </div>
        <router-link
          to="{ name: 'Signin' }"
          @click.prevent="onSignout"
          class="no-underline text-white transition-colors transition-ease-in transition-duration-300 hover:text-yellow-300"
        >
          <i class="pi pi-fw pi-power-off mr-2" />
          <span>Sign out</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
