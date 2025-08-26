<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        data-slot="menubar-sub-content"
        class="z-50 min-w-[8rem] origin-top-left overflow-hidden rounded-md border p-1 shadow-lg bg-popover text-popover-foreground"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({ isOpen: Boolean });
</script>