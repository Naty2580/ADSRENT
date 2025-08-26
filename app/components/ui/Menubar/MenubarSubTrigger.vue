<template>
  <div
    data-slot="menubar-sub-trigger"
    :class="[
      'flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none',
      'focus:bg-accent focus:text-accent-foreground',
      isOpen ? 'bg-accent text-accent-foreground' : '',
      inset ? 'pl-8' : '',
      className,
    ]"
    @click="$emit('toggle')"
  >
    <slot />
    <svg class="ml-auto h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  className: String,
  inset: Boolean,
  isOpen: Boolean,
});
defineEmits(['toggle']);
</script>