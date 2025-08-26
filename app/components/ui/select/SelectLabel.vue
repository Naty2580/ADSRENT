<!-- src/components/ui/select/SelectLabel.vue -->
<script setup>
import { SelectLabel } from 'radix-vue';
import { cn } from '../utils';
const props = defineProps({
  class: String,
});
</script>
<template>
  <SelectLabel :class="cn('px-2 py-1.5 text-sm font-semibold', props.class)">
    <slot />
  </SelectLabel>
</template>