<!-- File: src/components/ui/card/CardContent.vue -->
<script setup>
import { cn } from '../utils';
const props = defineProps({ class: String });
</script>
<template>
  <div :class="cn('p-6', props.class)">
    <slot />
  </div>
</template>