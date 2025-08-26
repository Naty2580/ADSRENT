<template>
  <transition name="slide">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex">
      <div class="bg-black/50 w-full" @click="emit('update:modelValue', false)" />
      <div class="w-80 bg-white p-4 shadow-lg">
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
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
