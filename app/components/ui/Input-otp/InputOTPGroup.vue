<template>
  <div data-slot="input-otp-group" :class="['flex items-center gap-1', className]">
    <slot />
  </div>
</template>

<script setup>
defineProps({ className: String })
</script>