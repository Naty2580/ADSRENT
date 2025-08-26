<template>
  <div data-slot="menubar-separator" :class="['bg-border -mx-1 my-1 h-px', className]" />
</template>

<script setup>
defineProps({ className: String });
</script>