<template>
  <div data-slot="command-separator" class="bg-border -mx-1 h-px" :class="className" />
</template>

<script setup>
defineProps({ className: String })
</script>