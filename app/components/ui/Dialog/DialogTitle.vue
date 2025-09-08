<!-- src/components/ui/dialog/DialogTitle.vue -->
<script setup>
import { DialogTitle } from 'radix-vue';
import { cn } from '../utils';
const props = defineProps({
  class: String,
});
</script>

<template>
  <DialogTitle :class="cn('text-lg leading-none font-semibold', props.class)">
    <slot />
  </DialogTitle>
</template>