<script setup>
import { ref, provide } from 'vue';
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';

const mainSearch = ref('');

const onSetSearchValue = value => {
  mainSearch.value = value;
};

provide('search', mainSearch);
</script>

<template>
  <header>
    <MainHeader @setSearchValue="onSetSearchValue" />
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <MainFooter />
  </footer>
  <Toast />
</template>
