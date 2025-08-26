<template>
  <div data-slot="collapsible">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  // Optional: you can pass props like `open`, `disabled`, etc. if needed
})
</script>