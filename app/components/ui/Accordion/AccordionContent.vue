<script setup>
const props = defineProps({
  isOpen: Boolean,
})
</script>

<template>
  <transition name="accordion">
    <div
      v-if="isOpen"
      data-slot="accordion-content"
      class="overflow-hidden text-sm pt-0 pb-4"
    >
      <slot />
    </div>
  </transition>
</template>

<style>
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.3s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  max-height: 500px;
}
</style>