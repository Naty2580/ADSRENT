<!-- src/components/ui/select/SelectSeparator.vue -->
<script setup>
import { SelectSeparator } from 'radix-vue';
import { cn } from '../utils';
const props = defineProps({
  class: String,
});
</script>
<template>
  <SelectSeparator :class="cn('-mx-1 my-1 h-px bg-muted', props.class)" />
</template>