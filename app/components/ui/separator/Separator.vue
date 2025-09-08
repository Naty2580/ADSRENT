<script setup>
import { Separator, useForwardProps } from 'radix-vue';
import { cn } from '../utils'; // Assuming your utils file is located at ../utils

// Define the component's props with default values, matching the React component.
const props = defineProps({
  asChild: {
    type: Boolean,
    required: false,
  },
  as: {
    type: [String, Object],
    required: false,
  },
  decorative: {
    type: Boolean,
    default: true,
    required: false,
  },
  orientation: {
    type: String,
    default: 'horizontal',
    required: false,
  },
  class: {
    type: String,
    required: false,
    default: '',
  },
});

// Forward the props to the underlying Radix-Vue component.
const forwardedProps = useForwardProps(props);
</script>

<template>
  <Separator
    v-bind="forwardedProps"
    data-slot="separator-root"
    :class="cn(
      'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
      props.class
    )"
  />
</template>