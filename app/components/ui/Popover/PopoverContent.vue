<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        data-slot="popover-content"
        :class="[
          'z-50 w-72 rounded-md border p-4 shadow-md bg-popover text-popover-foreground',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className,
        ]"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  className: String,
  isOpen: Boolean,
})
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