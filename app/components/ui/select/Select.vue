<!-- src/components/ui/select/Select.vue -->
<script setup>
import { SelectRoot } from 'radix-vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
});
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <SelectRoot
    :value="props.modelValue"
    @update:value="emit('update:modelValue', $event)"
  >
    <slot />
  </SelectRoot>
</template>
