<script setup>
import { ref } from 'vue';
import AppProductList from '@/components/AppProductList.vue';
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';

const mainSearch = ref('');
const onSetSearchValue = value => {
  mainSearch.value = value;
};
</script>

<template>
  <header>
    <AppHeader @setSearchValue="onSetSearchValue" />
  </header>

  <main>
    <AppProductList :search="mainSearch" />
  </main>

  <footer>
    <AppFooter />
  </footer>
</template>
