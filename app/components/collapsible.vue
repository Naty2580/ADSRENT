<template>
  <div data-slot="collapsible">
    <button
      data-slot="collapsible-trigger"
      @click="isOpen = !isOpen"
    >
      <slot name="trigger" />
    </button>

    <transition name="fade">
      <div
        v-if="isOpen"
        data-slot="collapsible-content"
      >
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
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
