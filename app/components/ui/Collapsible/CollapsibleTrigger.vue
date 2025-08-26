<template>
  <button
    data-slot="collapsible-trigger"
    @click="$emit('toggle')"
    :aria-expanded="open"
    :class="className"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  open: Boolean,
  className: String,
})
defineEmits(['toggle'])
</script>