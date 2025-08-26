<template>
  <li data-slot="navigation-menu-item" :class="['relative', className]">
    <slot />
  </li>
</template>

<script setup>
defineProps({ className: String })
</script>