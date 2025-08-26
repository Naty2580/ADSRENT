<template>
  <div class="absolute top-full left-0 isolate z-50 flex justify-center">
    <div
      data-slot="navigation-menu-viewport"
      :class="[
        'origin-top-center bg-popover text-popover-foreground relative mt-1.5 overflow-hidden rounded-md border shadow',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90',
        'h-[var(--radix-navigation-menu-viewport-height)] w-full md:w-[var(--radix-navigation-menu-viewport-width)]',
        className,
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({ className: String })
</script>