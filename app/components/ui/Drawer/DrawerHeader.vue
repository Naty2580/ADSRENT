<template>
  <div
    data-slot="drawer-header"
    class="flex flex-col gap-1.5 p-4"
    :class="className"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({ className: String })
</script>