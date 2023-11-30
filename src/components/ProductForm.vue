<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Spinner from '@/components/Spinner.vue';

const emit = defineEmits();

const title = ref('');
const category = ref('');
const description = ref('');
const price = ref('');

const onAddProduct = () => {
  emit('add-product', {
    id: uuidv4(),
    title: title.value,
    category: category.value,
    description: description.value,
    price: price.value,
    image:
      'https://mir-baget.com/upload/iblock/b9b/nibxd6dvjqm4yv24tzzsvvv6y7w1rhzd.png',
    rating: {
      rate: 0,
      count: 0
    }
  });
};

const onHideAddProductForm = () => {
  emit('add-product', null);
};
</script>

<template>
  <div
    class="px-4 py-8 md:px-6 lg:px-8 flex align-items-center justify-content-center"
  >
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-4">
      <div @keyup.enter="onAddProduct">
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
        <InputText
          id="price1"
          type="text"
          class="w-full mb-4"
          v-model="price"
          placeholder="Input Price"
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
            @click="onHideAddProductForm"
          ></Button>
          <Button
            label="Add product"
            icon="pi pi-plus"
            class="w-5"
            @click="onAddProduct"
          ></Button>
        </div>
      </div>
    </div>
  </div>
</template>
