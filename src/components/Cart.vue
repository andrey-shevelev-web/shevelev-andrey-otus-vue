<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import Toolbar from 'primevue/toolbar';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import Spinner from '@/components/Spinner.vue';
import { useRouter } from 'vue-router';
import CartItem from '@/components/CartItem.vue';
import { CART_DEC_QUANTITY } from '@/constants';

const props = defineProps([]);
const emit = defineEmits();
const router = useRouter();

const pageTitle = ref('Your cart');
const cartItems = reactive([]);
const isRequestRunning = ref(false);

const cartTotalAmount = computed(() => {
  const total = cartItems.reduce((acc, o) => {
    return acc + o.price * o.quantity;
  }, 0);

  return `Total Amount: $${total.toFixed(2)}`;
});

const cartTotalQuantityRaw = computed(() => {
  const total = cartItems.reduce((acc, o) => {
    return acc + o.quantity;
  }, 0);

  return total;
});

const cartTotalQuantity = computed(() => {
  const total = cartItems.reduce((acc, o) => {
    return acc + o.quantity;
  }, 0);

  return `Total Products: ${total}`;
});

const onChangeQuantity = (productId, action) => {
  const foundCartItem = cartItems.find(o => o.productId == productId);
  if (foundCartItem) {
    switch (action) {
      case CART_DEC_QUANTITY:
        if (foundCartItem.quantity > 1) foundCartItem.quantity -= 1;
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

const onCheckout = () => {
  router.push({ name: 'OrderForm' });
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
        <Tag
          :value="cartTotalAmount"
          severity="success"
          class="font-semibold text-lg mr-2"
        ></Tag>
        <Tag
          :value="cartTotalQuantity"
          severity="success"
          class="font-semibold text-lg mr-4"
        ></Tag>
        <Button
          label="Сheckout"
          icon="pi pi-check-square"
          :disabled="!cartTotalQuantityRaw"
          @click="onCheckout"
        />
      </template>

      <template #end>
        <Button
          label="Clear Cart"
          icon="pi pi-trash"
          severity="danger"
          :disabled="!cartTotalQuantityRaw"
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
