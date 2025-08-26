<template>
  <span
    data-slot="dropdown-menu-shortcut"
    class="ml-auto text-xs tracking-widest text-muted-foreground"
    :class="className"
  >
    <slot />
  </span>
</template>

<script setup>
defineProps({ className: String })
</script>