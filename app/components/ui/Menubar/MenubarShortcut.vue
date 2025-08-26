<template>
  <span
    data-slot="menubar-shortcut"
    :class="['text-muted-foreground ml-auto text-xs tracking-widest', className]"
  >
    <slot />
  </span>
</template>

<script setup>
defineProps({ className: String });
</script>