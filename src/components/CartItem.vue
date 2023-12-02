<script setup>
import { computed } from 'vue';
import Button from 'primevue/button';
import { CART_INC_QUANTITY, CART_DEC_QUANTITY } from '@/constants';

const props = defineProps(['cartItem']);

const amount = computed(() => {
  const { price, quantity } = props.cartItem;
  return (price * quantity).toFixed(2);
});
</script>

<template>
  <div class="col-12 lg:col-3">
    <div class="p-3 h-full">
      <div
        class="shadow-2 p-3 h-full flex flex-column surface-card"
        style="border-radius: 6px"
      >
        <div class="mb-3 inline-block surface-card">
          <img
            :src="cartItem.image"
            alt="Product image"
            height="40"
            class="text-center mr-3"
          />
        </div>

        <div class="text-900 font-medium text-lg mb-2">
          {{ cartItem.title }}
        </div>

        <div class="flex align-items-center mb-3">
          <span class="text-lg font-semibold"
            >Price: ${{ cartItem.price }}</span
          >
        </div>
        <hr class="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
        <div class="flex align-items-center mb-3">
          <span class="text-xl font-semibold text-primary"
            >Amount: ${{ amount }}</span
          >
        </div>

        <div
          class="flex flex-wrap justify-content-between align-content-center"
        >
          <div class="flex justify-content-start align-content-center gap-3">
            <Button
              icon="pi pi-minus"
              class="py-2"
              @click="
                $emit('changeQuantity', cartItem.productId, CART_DEC_QUANTITY)
              "
            ></Button>
            <div class="flex align-items-center">
              <span class="text-xl font-semibold text-primary">{{
                cartItem.quantity
              }}</span>
            </div>
            <Button
              icon="pi pi-plus"
              class="py-2"
              @click="
                $emit('changeQuantity', cartItem.productId, CART_INC_QUANTITY)
              "
            ></Button>
          </div>
          <Button
            icon="pi pi-trash"
            class="py-2"
            severity="danger"
            @click="$emit('removeCartItem', cartItem.productId)"
          ></Button>
        </div>
      </div>
    </div>
  </div>
</template>
