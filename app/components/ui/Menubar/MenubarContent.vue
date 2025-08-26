<!-- MenubarContent.vue -->
<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        data-slot="menubar-content"
        class="z-50 min-w-[12rem] origin-top-left overflow-hidden rounded-md border p-1 shadow-md bg-popover text-popover-foreground"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>