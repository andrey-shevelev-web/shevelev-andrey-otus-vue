<script setup>
import { ref, watch } from 'vue';
import Search from '@/components/Search.vue';
import { getUsername, authSignout } from '@/services/AuthService';
import { useRouter } from 'vue-router';

const router = useRouter();

const emit = defineEmits();
const search = ref('');

watch(search, (newSearchValue, oldSearchValue) => {
  emit('setSearchValue', newSearchValue);
});

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
        <Search v-model="search" class="mr-4" />
        <router-link
          :to="{ name: 'Cart' }"
          class="mr-4 no-underline text-white transition-colors transition-ease-in transition-duration-300 hover:text-yellow-300"
        >
          <i class="pi pi-fw pi-cart-plus mr-2" />
          <span>Cart</span>
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
