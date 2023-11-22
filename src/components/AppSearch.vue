<script setup>
import { defineProps } from 'vue';
import InputText from 'primevue/inputtext';

const props = defineProps(['modelValue']);
</script>

<template>
  <InputText
    v-model="props.modelValue"
    placeholder="Search by name or price"
    size="small"
    @keyup.enter="$emit('update:modelValue', $event.target.value)"
    @keyup.esc="$emit('update:modelValue', '')"
  />
</template>
