<template>
  <div
    data-slot="command"
    class="bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md"
    :class="className"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({ className: String })
</script>