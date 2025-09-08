<!-- src/components/ui/sheet/SheetHeader.vue -->
<script setup>
import { cn } from '../utils';
const props = defineProps({
  class: String,
});
</script>

<template>
  <div :class="cn('flex flex-col gap-1.5 p-4', props.class)">
    <slot />
  </div>
</template>