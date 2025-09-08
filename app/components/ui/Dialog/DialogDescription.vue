<!-- src/components/ui/dialog/DialogDescription.vue -->
<script setup>
import { DialogDescription } from 'radix-vue';
import { cn } from '../utils';
const props = defineProps({
  class: String,
});
</script>

<template>
  <DialogDescription :class="cn('text-muted-foreground text-sm', props.class)">
    <slot />
  </DialogDescription>
</template>