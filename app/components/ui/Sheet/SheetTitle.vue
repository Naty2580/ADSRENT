<!-- src/components/ui/sheet/SheetTitle.vue -->
<script setup>
import { DialogTitle } from 'radix-vue';
import { cn } from '../utils';
const props = defineProps({
  class: String,
});
</script>

<template>
  <DialogTitle :class="cn('text-foreground font-semibold', props.class)">
    <slot />
  </DialogTitle>
</template>