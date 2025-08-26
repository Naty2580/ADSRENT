<script setup>
defineProps({
  modelValue: Array,
})
</script>

<template>
  <div data-slot="accordion">
    <slot />
  </div>
</template>