<!-- src/components/ui/dropdown-menu/DropdownMenuItem.vue -->
<script setup>
import { defineProps } from 'vue'; // No longer need withDefaults
import { DropdownMenuItem } from 'radix-vue';
import { cn } from '../utils';
import Primitive from '../Primitive.vue';

// --- FIX: Define props and defaults directly inside defineProps ---
const props = defineProps({
  class: String,
  inset: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'default',
  },
  asChild: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <DropdownMenuItem
    :as-child="props.asChild"
    :data-inset="props.inset ? '' : undefined"
    :data-variant="props.variant"
    :class="cn(
      'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive',
      '[&_svg:not([class*=\'text-\'])]:text-muted-foreground [&_svg]:size-4',
      props.inset && 'pl-8',
      props.class
    )"
  >
    <Primitive as="div" :as-child="props.asChild">
      <slot />
    </Primitive>
  </DropdownMenuItem>
</template>