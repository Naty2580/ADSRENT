<!-- src/components/ui/popover/PopoverTrigger.vue -->
<script setup>
// Import the trigger component from the Vue version of Radix
import { PopoverTrigger, useForwardProps } from 'radix-vue';

// Define and forward the props without TypeScript
const props = defineProps({
  // asChild: { type: Boolean, default: false },
  // as: { type: [String, Object], default: 'button' },
});
const forwardedProps = useForwardProps(props);
</script>

<template>
  <PopoverTrigger v-bind="forwardedProps" data-slot="popover-trigger">
    <slot />
  </PopoverTrigger>
</template>