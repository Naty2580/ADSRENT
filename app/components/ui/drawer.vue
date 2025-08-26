<template>
  <transition name="slide">
    <div v-if="modelValue" class="drawer">
      <div class="drawer-overlay" @click="emit('update:modelValue', false)" />
      <div class="drawer-panel">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(['update:modelValue']);
</script>

<style scoped>
.drawer {
  position: fixed;
  inset: 0;
  display: flex;
  z-index: 1000;
}
.drawer-overlay {
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
}
.drawer-panel {
  width: 300px;
  background: white;
  padding: 1rem;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
