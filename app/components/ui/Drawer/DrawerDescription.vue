<template>
  <p
    data-slot="drawer-description"
    class="text-muted-foreground text-sm"
    :class="className"
  >
    <slot />
  </p>
</template>

<script setup>
defineProps({ className: String })
</script>