<!-- src/components/ui/dropdown-menu/DropdownMenuSeparator.vue -->
<script setup>
import { DropdownMenuSeparator } from 'radix-vue';
import { cn } from '../utils';
const props = defineProps({
  class: String,
});
</script>

<template>
  <DropdownMenuSeparator :class="cn('-mx-1 my-1 h-px bg-border', props.class)" />
</template>