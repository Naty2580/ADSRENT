<template>
  <ul
    data-slot="pagination-content"
    :class="['flex flex-row items-center gap-1', className]"
  >
    <slot />
  </ul>
</template>

<script setup>
defineProps({ className: String })
</script>