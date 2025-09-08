<template>
  <div
    data-slot="context-menu-label"
    class="px-2 py-1.5 text-sm font-medium text-foreground"
    :class="inset ? 'pl-8' : ''"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({ inset: Boolean })
</script>