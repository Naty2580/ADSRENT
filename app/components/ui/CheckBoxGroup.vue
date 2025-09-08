<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: { // This prop is automatically used by v-model
    type: Array,
    default: () => [],
  },
  options: { // An array of { label, value } objects
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

// This computed property safely handles the array and emits updates
const selectedValues = computed({
  get() {
    return props.modelValue || [];
  },
  set(newValues) {
    emit('update:modelValue', newValues);
  },
});
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <label v-for="option in options" :key="option.value" class="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        :value="option.value"
        v-model="selectedValues"
        class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
      />
      <span class="text-sm font-medium text-foreground">{{ option.label }}</span>
    </label>
  </div>
</template>