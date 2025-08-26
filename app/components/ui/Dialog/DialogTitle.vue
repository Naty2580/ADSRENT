<template>
  <h2
    data-slot="dialog-title"
    class="text-lg font-semibold leading-none"
    :class="className"
  >
    <slot />
  </h2>
</template>

<script setup>
defineProps({ className: String })
</script>