<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <li
    data-slot="sidebar-menu-sub-item"
    data-sidebar="menu-sub-item"
    class="group/menu-sub-item relative"
  >
    <slot />
  </li>
</template>