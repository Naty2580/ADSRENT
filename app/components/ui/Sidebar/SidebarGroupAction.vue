<script setup lang="ts">
defineProps<{ asChild?: boolean }>()
</script>

<template>
  <button
    data-slot="sidebar-group-action"
    data-sidebar="group-action"
    class="text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex w-5 h-5 items-center justify-center rounded-md transition-transform [&>svg]:size-4"
  >
    <slot />
  </button>
</template>