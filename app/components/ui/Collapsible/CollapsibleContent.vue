<template>
  <div
    data-slot="collapsible-content"
    v-show="open"
    :class="className"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  open: Boolean,
  className: String,
})
</script>