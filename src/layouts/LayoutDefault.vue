<script setup>
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';
</script>

<template>
  <header>
    <MainHeader />
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <MainFooter />
  </footer>
  <Toast />
</template>
