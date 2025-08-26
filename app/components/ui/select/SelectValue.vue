<!-- src/components/ui/select/SelectValue.vue -->
<script setup>
import { SelectValue } from 'radix-vue';
</script>
<template>
  <SelectValue v-bind="$attrs">
    <slot />
  </SelectValue>
</template>