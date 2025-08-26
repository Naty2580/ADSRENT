<template>
  <span
    data-slot="command-shortcut"
    class="text-muted-foreground ml-auto text-xs tracking-widest"
    :class="className"
  >
    <slot />
  </span>
</template>

<script setup>
defineProps({ className: String })
</script>