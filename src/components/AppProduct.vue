<script setup>
import { defineProps } from 'vue';
import Button from 'primevue/button';

defineProps({
  title: String,
  price: Number,
  category: String,
  image: String,
  description: String,
  rating: Object
});
</script>

<template>
  <div class="col-12 lg:col-4">
    <div class="p-3 h-full">
      <div
        class="shadow-2 p-3 h-full flex flex-column surface-card"
        style="border-radius: 6px"
      >
        <div class="mb-3 inline-block surface-card">
          <img
            :src="image"
            alt="Product image"
            height="120"
            class="text-center mr-3"
          />
        </div>

        <div class="text-900 font-medium text-xl">{{ title }}</div>
        <hr class="my-1 mx-0 border-top-1 border-none surface-border" />
        <div class="text-600 mb-3">{{ category }}</div>

        <div class="flex align-items-center mb-3">
          <span class="font-bold text-2xl text-900">${{ price }}</span>
        </div>
        <div class="text-700 line-height-3 mb-3">{{ description }}</div>

        <hr class="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
        <div class="flex align-items-center mb-3">
          <span class="font-bold text-700">
            Rate: {{ rating.rate }} / count: {{ rating.count }}
          </span>
        </div>
        <Button label="Buy Now" class="p-3 w-full"></Button>
      </div>
    </div>
  </div>
</template>
