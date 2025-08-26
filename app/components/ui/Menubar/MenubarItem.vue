<template>
  <div
    data-slot="menubar-item"
    :class="[
      'relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none',
      'focus:bg-accent focus:text-accent-foreground',
      variant === 'destructive' ? 'text-destructive focus:bg-destructive/10' : '',
      inset ? 'pl-8' : '',
      className,
    ]"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  className: String,
  inset: Boolean,
  variant: {
    type: String,
    default: 'default',
  },
});
</script>