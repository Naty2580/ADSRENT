<template>
  <li
    data-slot="breadcrumb-item"
    :class="['inline-flex items-center gap-1.5', className]"
  >
    <slot />
  </li>
</template>

<script setup>
const props = defineProps({ className: String })
</script>