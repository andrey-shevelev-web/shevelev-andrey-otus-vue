<script setup>
import { ref, computed } from 'vue';
import Toolbar from 'primevue/toolbar';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import CartItem from '@/components/CartItem.vue';
import { useCartStore } from '@/stores/CartStore';

const props = defineProps([]);
const router = useRouter();
const cartStore = useCartStore();

const pageTitle = ref('Your cart');

const cartSummary = computed(() => {
  return `Total amount: $${cartStore.cartTotalAmount} / products: ${cartStore.cartTotalQuantity}`;
});

const onCheckout = () => {
  router.push({ name: 'OrderForm' });
};
</script>

<template>
  <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
    <div class="text-900 font-bold text-6xl mb-4 text-center">
      {{ pageTitle }}
    </div>

    <Toolbar>
      <template #start>
        <Tag
          :value="cartSummary"
          severity="success"
          class="font-semibold text-lg px-3 mr-4"
        ></Tag>
        <Button
          label="Сheckout"
          icon="pi pi-check-square"
          :disabled="!cartStore.cartTotalQuantity"
          @click="onCheckout"
        />
      </template>

      <template #end>
        <Button
          label="Clear Cart"
          icon="pi pi-trash"
          severity="danger"
          :disabled="!cartStore.cartTotalQuantity"
          @click="cartStore.clearCart"
        />
      </template>
    </Toolbar>

    <div class="grid">
      <CartItem
        v-for="cartItem in cartStore.cart"
        :key="cartItem.id"
        :cartItem="cartItem"
      />
    </div>
  </div>
</template>
