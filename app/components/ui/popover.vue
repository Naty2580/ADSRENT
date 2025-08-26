<template>
  <div class="relative inline-block">
    <div @click="toggle" class="cursor-pointer">
      <slot name="trigger" />
    </div>
    <transition name="fade">
      <div
        v-if="isOpen"
        class="absolute z-50 mt-2 p-4 bg-white border rounded shadow-md"
      >
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const isOpen = ref(false);
const toggle = () => (isOpen.value = !isOpen.value);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
