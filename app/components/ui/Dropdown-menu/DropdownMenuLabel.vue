<!-- src/components/ui/dropdown-menu/DropdownMenuLabel.vue -->
<script setup>
import { DropdownMenuLabel } from 'radix-vue';
import { cn } from '../utils';

const props = defineProps({
  class: String,
  inset: Boolean,
});
</script>

<template>
  <DropdownMenuLabel
    :data-inset="props.inset ? '' : undefined"
    :class="cn(
      'px-2 py-1.5 text-sm font-semibold',
      props.inset && 'pl-8',
      props.class,
    )"
  >
    <slot />
  </DropdownMenuLabel>
</template>