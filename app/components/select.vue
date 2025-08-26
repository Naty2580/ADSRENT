<template>
  <select
    v-bind="$attrs"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
    class="block w-full rounded border px-3 py-2 text-sm"
  >
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script>
import { defineProps, defineEmits } from 'vue'

export default {
  name: 'Select',
  props: {
    options: Array,
    modelValue: [String, Number],
  },
  emits: ['update:modelValue'],
}
</script>
