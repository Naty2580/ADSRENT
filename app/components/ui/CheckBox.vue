<template>
  <label class="inline-flex items-center">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      :disabled="disabled"
      :aria-invalid="invalid"
      data-slot="checkbox"
      class="peer size-4 shrink-0 rounded-[4px]  shadow-xs transition-shadow outline-none
        border bg-input-background dark:bg-input/30
        focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
        disabled:cursor-not-allowed disabled:opacity-50
        aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40
        checked:bg-primary checked:text-primary-foreground checked:border-primary dark:checked:bg-primary
        appearance-none"
    />
    <span
      data-slot="checkbox-indicator"
      class="absolute pointer-events-none flex items-center justify-center text-current transition-none"
    >
      <CheckIcon v-if="modelValue" class="size-3.5" />
    </span>
  </label>
</template>

<script setup>
import {CheckIcon} from 'lucide-vue-next'

defineProps({
  modelValue: Boolean,
  disabled: Boolean,
  invalid: Boolean,
})
</script>