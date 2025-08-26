<template>
  <div data-slot="form-item" class="grid gap-2" :class="className">
    <slot />
  </div>
</template>

<script setup>
defineProps({ className: String })
</script>