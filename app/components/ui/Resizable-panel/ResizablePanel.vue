<script setup lang="ts">
const props = defineProps<{
  size?: string
  minSize?: string
  maxSize?: string
}>()
</script>

<template>
  <div
    data-slot="resizable-panel"
    :style="{
      flexBasis: props.size,
      minWidth: props.minSize,
      maxWidth: props.maxSize
    }"
    class="flex-grow overflow-auto"
  >
    <slot />
  </div>
</template>