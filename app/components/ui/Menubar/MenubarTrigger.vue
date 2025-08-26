<!-- MenubarTrigger.vue -->
<template>
  <button
    data-slot="menubar-trigger"
    :class="[
      'flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-none select-none',
      'focus:bg-accent focus:text-accent-foreground',
      isOpen ? 'bg-accent text-accent-foreground' : '',
      className,
    ]"
    @click="$emit('toggle')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  className: String,
  isOpen: Boolean,
});
defineEmits(['toggle']);
</script>