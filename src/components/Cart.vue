<script setup>
import { ref, reactive, onMounted } from 'vue';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import Spinner from '@/components/Spinner.vue';
import CartItem from '@/components/CartItem.vue';
import { CART_DEC_QUANTITY } from '@/constants';

const props = defineProps([]);
const emit = defineEmits();

const pageTitle = ref('Your cart');
const cartItems = reactive([]);
const isRequestRunning = ref(false);

const onChangeQuantity = (productId, action) => {
  const foundCartItem = cartItems.find(o => o.productId == productId);
  if (foundCartItem) {
    switch (action) {
      case CART_DEC_QUANTITY:
        if (foundCartItem.quantity > 0) foundCartItem.quantity -= 1;
        break;
      default:
        foundCartItem.quantity += 1;
    }
  }

  localStorage.setItem('cart', JSON.stringify(cartItems));
};

const onRemoveCartItem = productId => {
  const foundCartItemIdx = cartItems.findIndex(o => o.productId == productId);
  cartItems.splice(foundCartItemIdx, 1);
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

const onClearCart = () => {
  cartItems.splice(0, cartItems.length);
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

onMounted(async () => {
  const cartFromLS = JSON.parse(localStorage.getItem('cart'));
  cartItems.push(...cartFromLS);
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
          label="Clear Cart"
          icon="pi pi-trash"
          class="mr-2"
          severity="danger"
          @click="onClearCart"
        />
      </template>
    </Toolbar>

    <div class="grid">
      <Spinner v-if="isRequestRunning" />
      <template v-else>
        <CartItem
          v-for="cartItem in cartItems"
          :key="cartItem.id"
          :cartItem="cartItem"
          @changeQuantity="onChangeQuantity"
          @removeCartItem="onRemoveCartItem"
        />
      </template>
    </div>
  </div>
</template>
