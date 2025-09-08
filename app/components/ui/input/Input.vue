<script setup>
import { cn } from '~/lib/utils'; // Make sure this path is correct for your `cn` utility

// This component is now fully compatible with v-model.
const props = defineProps({
  modelValue: [String, Number], // Accepts the value from the parent
  type: {
    type: String,
    default: 'text', // Provide a sensible default
  },
  class: {
    type: String,
    default: '',
  },
});
// Declares the event that the parent will listen to for changes
const emit = defineEmits(['update:modelValue']);

function onInput(event) {
  // Emits the new value up to the parent every time the user types
  emit('update:modelValue', event.target.value);
}
</script>

<template> 
  <input
    :type="props.type"
    :value="props.modelValue"
    @input="onInput"
    :class="cn(
      'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', props.class,
    )"
  />
</template>

 