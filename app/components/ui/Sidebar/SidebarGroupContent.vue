<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="sidebar-group-content"
    data-sidebar="group-content"
    class="w-full text-sm"
  >
    <slot />
  </div>
</template>