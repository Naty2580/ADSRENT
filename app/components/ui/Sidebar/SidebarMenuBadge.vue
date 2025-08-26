<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="sidebar-menu-badge"
    data-sidebar="menu-badge"
    class="text-sidebar-foreground absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium"
  >
    <slot />
  </div>
</template>