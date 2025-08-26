<script setup lang="ts">
defineProps<{ asChild?: boolean }>()
</script>

<template>
  <div
    data-slot="sidebar-group-label"
    data-sidebar="group-label"
    class="text-sidebar-foreground/70 ring-sidebar-ring flex h-8 items-center rounded-md px-2 text-xs font-medium transition-all [&>svg]:size-4"
  >
    <slot />
  </div>
</template>