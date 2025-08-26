<template>
  <div class="relative" @click="toggle">
    <slot name="trigger" />
    <div v-if="isOpen" class="absolute bg-white border mt-2 shadow-md z-50">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
const toggle = () => (isOpen.value = !isOpen.value);
</script>
