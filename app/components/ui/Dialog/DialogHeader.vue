<template>
  <div
    data-slot="dialog-header"
    class="flex flex-col gap-2 text-center sm:text-left"
    :class="className"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({ className: String })
</script>