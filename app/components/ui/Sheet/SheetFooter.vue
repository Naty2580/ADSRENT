<!-- src/components/ui/sheet/SheetFooter.vue -->
<script setup>
import { cn } from '../utils';
const props = defineProps({
  class: String,
});
</script>

<template>
  <div :class="cn('mt-auto flex flex-col gap-2 p-4', props.class)">
    <slot />
  </div>
</template>