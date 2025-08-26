<template>
  <div
    data-slot="input-otp"
    :class="['flex items-center gap-2', disabled ? 'opacity-50' : '', containerClassName]"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  containerClassName: String,
  disabled: Boolean,
})
</script>