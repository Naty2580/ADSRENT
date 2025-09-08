<!-- src/components/ui/popover/PopoverAnchor.vue -->
<script setup>
import { PopoverAnchor, useForwardProps } from 'radix-vue';

// Define and forward the props without TypeScript
const props = defineProps({
  // asChild: { type: Boolean, default: false },
  // as: { type: [String, Object], default: 'div' },
});
const forwardedProps = useForwardProps(props);
</script>

<template>
  <PopoverAnchor v-bind="forwardedProps" data-slot="popover-anchor">
    <slot />
  </PopoverAnchor>
</template>