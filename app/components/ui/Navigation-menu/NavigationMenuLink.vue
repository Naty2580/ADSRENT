<template>
  <a
    data-slot="navigation-menu-link"
    :class="[
      'flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none',
      'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
      'data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground',
      'focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1',
      className,
    ]"
  >
    <slot />
  </a>
</template>

<script setup>
defineProps({ className: String })
</script>