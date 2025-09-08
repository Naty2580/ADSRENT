<!-- src/components/ui/dialog/DialogFooter.vue -->
<script setup>
import { cn } from '../utils';
const props = defineProps({
  class: String,
});
</script>

<template>
  <div
    :class="
      cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', props.class)
    "
  >
    <slot />
  </div>
</template>