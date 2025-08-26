<template>
  <ul
    data-slot="navigation-menu-list"
    :class="['group flex flex-1 list-none items-center justify-center gap-1', className]"
  >
    <slot />
  </ul>
</template>

<script setup>
defineProps({ className: String })
</script>