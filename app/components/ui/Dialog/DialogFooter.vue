<template>
  <div
    data-slot="dialog-footer"
    class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"
    :class="className"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({ className: String })
</script>