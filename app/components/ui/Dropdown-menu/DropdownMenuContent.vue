<!-- src/components/ui/dropdown-menu/DropdownMenuContent.vue -->
<script setup>
import { defineProps } from 'vue';
import { DropdownMenuPortal, DropdownMenuContent } from 'radix-vue';
import { cn } from '../utils';

// --- THE FIX IS HERE ---
// We officially define 'align' as a prop that this component can receive.
const props = defineProps({
  class: String,
  sideOffset: {
    type: Number,
    default: 4,
  },
  align: {
    type: String,
    default: 'center', // Radix-vue's default is 'center'
  },
});
</script>

<template>
  <DropdownMenuPortal>
    <!-- 
      And here, we bind the 'align' prop we received down to the 
      underlying Radix component, which knows how to use it for positioning.
    -->
    <DropdownMenuContent
      :side-offset="props.sideOffset"
      :align="props.align" 
      :class="cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        props.class
      )"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>