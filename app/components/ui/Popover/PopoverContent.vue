<!-- src/components/ui/popover/PopoverContent.vue -->
<script setup>
import {
  PopoverContent,
  PopoverPortal,
  useForwardPropsEmits,
} from 'radix-vue';
import { cn } from '../utils'; // Assuming your utils file is in ../

// Define the props with defaults, just like in the React code
const props = defineProps({
  // Radix-Vue's props can be listed here for validation if needed
  // For simplicity, we are letting them be passed through directly.
  align: {
    type: String,
    default: 'center',
  },
  sideOffset: {
    type: Number,
    default: 4,
  },
});
const emits = defineEmits(['closeAutoFocus', 'escapeKeyDown', 'pointerDownOutside', 'interactOutside']);

// Forward props and emits to the underlying Radix component
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      v-bind="forwarded"
      data-slot="popover-content"
      :class="cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-[var(--radix-popover-content-transform-origin)] rounded-md border p-4 shadow-md outline-none',
        $attrs.class ?? ''
      )"
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>