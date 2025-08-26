<template>
  <div
    data-slot="menubar-label"
    :class="['px-2 py-1.5 text-sm font-medium', inset ? 'pl-8' : '', className]"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  className: String,
  inset: Boolean,
});
</script>