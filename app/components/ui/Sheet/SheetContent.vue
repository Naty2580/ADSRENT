<!-- src/components/ui/sheet/SheetContent.vue -->
<script setup>
import { computed, defineProps } from 'vue'; // Correctly import defineProps
import {
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
} from 'radix-vue';
import { XIcon } from 'lucide-vue-next';
import { cn } from '../utils';

// --- FIX: Define props and defaults directly inside defineProps ---
const props = defineProps({
  class: String,
  side: {
    type: String,
    default: 'right', // The default value is defined here
  },
});

// A computed property to dynamically build the class list
const contentClasses = computed(() => {
  const sideClasses = {
    top: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
    bottom: 'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
    left: 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
    right: 'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
  };

  return cn(
    'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
    sideClasses[props.side],
    props.class,
  );
});
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />
    <DialogContent :class="contentClasses">
      <slot />

      <DialogClose
        class="absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
      >
        <XIcon class="size-4" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>