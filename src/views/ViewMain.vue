<script setup>
import { ref } from 'vue';
import AppProductList from '@/components/AppProductList.vue';
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';

const mainSearch = ref('');
const mainHiddenAddProductForm = ref(true);

const onSetSearchValue = value => {
  mainSearch.value = value;
};

const onSetHiddenAddProductForm = event => {
  mainHiddenAddProductForm.value = event;
};
</script>

<template>
  <header>
    <AppHeader
      @setSearchValue="onSetSearchValue"
      @setHiddenAddProductForm="onSetHiddenAddProductForm"
    />
  </header>

  <main>
    <AppProductList
      :search="mainSearch"
      :hiddenAddProductForm="mainHiddenAddProductForm"
      @setHiddenAddProductForm="onSetHiddenAddProductForm"
    />
  </main>

  <footer>
    <AppFooter />
  </footer>
</template>
