<template>
  <div
    data-slot="command-list"
    class="max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto"
    :class="className"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({ className: String })
</script>