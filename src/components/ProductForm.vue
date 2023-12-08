<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Spinner from '@/components/Spinner.vue';
import { useProductStore } from '@/stores/ProductStore';

const productStore = useProductStore();

const title = ref('');
const category = ref('');
const description = ref('');
const price = ref('');

const onCreateProduct = () => {
  productStore.createProduct(
    title.value,
    category.value,
    description.value,
    price.value
  );
};
</script>

<template>
  <div
    class="px-4 py-8 md:px-6 lg:px-8 flex align-items-center justify-content-center"
  >
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-4">
      <div @keyup.enter="onCreateProduct">
        <label for="title1" class="block text-900 font-medium mb-2"
          >Title</label
        >
        <InputText
          id="title1"
          type="text"
          class="w-full mb-4"
          v-model="title"
          placeholder="Input title"
        />

        <label for="category1" class="block text-900 font-medium mb-2"
          >Category</label
        >
        <InputText
          id="category1"
          type="text"
          class="w-full mb-4"
          v-model="category"
          placeholder="Input category"
        />

        <label for="description1" class="block text-900 font-medium mb-2"
          >Description</label
        >
        <InputText
          id="description1"
          type="text"
          class="w-full mb-4"
          v-model="description"
          placeholder="Input description"
        />

        <label for="price1" class="block text-900 font-medium mb-2"
          >Price</label
        >
        <InputNumber
          id="price1"
          class="w-full mb-4"
          v-model="price"
          placeholder="Input Price"
          mode="currency"
          currency="USD"
          locale="en-US"
        />
        <Spinner v-if="false" />
        <div
          class="flex flex-wrap justify-content-between align-content-center"
        >
          <Button
            label="Cancel"
            icon="pi pi-times"
            class="w-5"
            severity="danger"
            @click="productStore.setVisibleCreateForm(false)"
          ></Button>
          <Button
            label="Add product"
            icon="pi pi-plus"
            class="w-5"
            @click="onCreateProduct"
          ></Button>
        </div>
      </div>
    </div>
  </div>
</template>
