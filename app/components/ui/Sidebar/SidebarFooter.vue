<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="sidebar-footer"
    data-sidebar="footer"
    class="flex flex-col gap-2 p-2"
  >
    <slot />
  </div>
</template>