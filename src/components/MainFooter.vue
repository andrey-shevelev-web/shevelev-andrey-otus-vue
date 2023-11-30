<script setup>
import { ref } from 'vue';

const taskNumber = ref(4);
</script>

<template>
  <div
    class="bg-bluegray-700 text-gray-100 p-3 flex justify-content-between lg:justify-content-center align-items-center flex-wrap"
  >
    <div class="font-bold mr-8">Shevelev Andrey &middot; 2023</div>
    <div class="align-items-center hidden lg:flex">
      <span class="line-height-3">
        OTUS &middot; Vue.JS developer &middot; Task {{ taskNumber }}
      </span>
    </div>
  </div>
</template>
