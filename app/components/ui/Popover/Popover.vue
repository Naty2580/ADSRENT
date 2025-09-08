<!-- src/components/ui/popover/Popover.vue -->
<script setup>
// Import the root component from the Vue version of Radix
import { PopoverRoot, useForwardProps } from 'radix-vue';

// Define and forward the props without TypeScript
const props = defineProps({
  // You can define prop types here if you want validation, e.g.,
  // open: { type: Boolean, default: undefined },
  // defaultOpen: { type: Boolean, default: false },
  // modal: { type: Boolean, default: false },
});
const forwardedProps = useForwardProps(props);
</script>

<template>
  <PopoverRoot v-bind="forwardedProps" data-slot="popover">
    <slot />
  </PopoverRoot>
</template>