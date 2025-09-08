<!-- File: src/components/ui/card/Card.vue -->
<script setup>
import { cn } from '../utils';
const props = defineProps({ class: String });
</script>
<template>
  <div :class="cn('rounded-lg border bg-card text-card-foreground shadow-sm', props.class)">
    <slot />
  </div>
</template>