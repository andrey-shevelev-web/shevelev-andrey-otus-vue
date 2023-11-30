<script setup>
import { ref } from 'vue';
import ProductList from '@/components/ProductList.vue';
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';

const mainSearch = ref('');
const mainHiddenAddProductForm = ref(true);
const mainHiddenOrderForm = ref(true);

const onSetSearchValue = value => {
  mainSearch.value = value;
};

const onSetHiddenAddProductForm = event => {
  mainHiddenAddProductForm.value = !!event;
};

const onSetHiddenOrderForm = event => {
  mainHiddenOrderForm.value = !!event;
};
</script>

<template>
  <header>
    <MainHeader
      @setSearchValue="onSetSearchValue"
      @setHiddenAddProductForm="onSetHiddenAddProductForm"
      @setHiddenOrderForm="onSetHiddenOrderForm"
    />
  </header>

  <main>
    <ProductList
      :search="mainSearch"
      :hiddenAddProductForm="mainHiddenAddProductForm"
      :hiddenOrderForm="mainHiddenOrderForm"
      @setHiddenAddProductForm="onSetHiddenAddProductForm"
      @setHiddenOrderForm="onSetHiddenOrderForm"
    />
  </main>

  <footer>
    <MainFooter />
  </footer>
</template>
