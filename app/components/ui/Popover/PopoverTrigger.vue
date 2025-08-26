<template>
  <button data-slot="popover-trigger" @click="$emit('toggle')">
    <slot />
  </button>
</template>

<script setup>
defineEmits(['toggle'])
</script>