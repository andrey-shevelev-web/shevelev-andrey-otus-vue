<script setup>
import ProgressSpinner from 'primevue/progressspinner';
</script>

<template>
  <div class="card flex justify-content-center h-full w-full">
    <ProgressSpinner
      style="width: 52px; height: 56px"
      strokeWidth="4"
      fill="var(--surface-ground)"
      animationDuration=".8s"
      aria-label="Custom ProgressSpinner"
    />
  </div>
</template>
