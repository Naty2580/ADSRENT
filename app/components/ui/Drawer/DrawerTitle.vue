<template>
  <h2
    data-slot="drawer-title"
    class="text-foreground font-semibold"
    :class="className"
  >
    <slot />
  </h2>
</template>

<script setup>
defineProps({ className: String })
</script>