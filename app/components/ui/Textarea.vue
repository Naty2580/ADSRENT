<script setup lang="ts">
import { cn } from '@/lib/cn'

const props = defineProps<{
  class?: string
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
  rows?: number
  cols?: number
  readonly?: boolean
  autocomplete?: string
  autofocus?: boolean
  spellcheck?: boolean
  ariaInvalid?: boolean
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <textarea
    data-slot="textarea"
    :class="cn(
      'resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      props.class
    )"
    :value="props.modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :required="props.required"
    :name="props.name"
    :id="props.id"
    :rows="props.rows"
    :cols="props.cols"
    :readonly="props.readonly"
    :autocomplete="props.autocomplete"
    :autofocus="props.autofocus"
    :spellcheck="props.spellcheck"
    :aria-invalid="props.ariaInvalid"
  />
</template>