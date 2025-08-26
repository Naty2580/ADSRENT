<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md'
  isActive?: boolean
}>()
</script>

<template>
  <a
    data-slot="sidebar-menu-sub-button"
    data-sidebar="menu-sub-button"
    :data-size="size"
    :data-active="isActive"
    class="text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex h-7 items-center gap-2 rounded-md px-2 text-sm [&>svg]:size-4"
  >
    <slot />
  </a>
</template>