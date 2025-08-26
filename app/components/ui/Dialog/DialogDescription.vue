<template>
  <p
    data-slot="dialog-description"
    class="text-sm text-muted-foreground"
    :class="className"
  >
    <slot />
  </p>
</template>

<script setup>
defineProps({ className: String })
</script>