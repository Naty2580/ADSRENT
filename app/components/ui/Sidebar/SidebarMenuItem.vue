<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <li
    data-slot="sidebar-menu-item"
    data-sidebar="menu-item"
    class="group/menu-item relative"
  >
    <slot />
  </li>
</template>