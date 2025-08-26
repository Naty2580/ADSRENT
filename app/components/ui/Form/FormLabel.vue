<template>
  <label
    data-slot="form-label"
    :for="name"
    :class="['font-medium', error ? 'text-destructive' : '', className]"
  >
    <slot />
  </label>
</template>

<script setup>
import { useFormField } from '@/components/ui/useFormField.ts'
const { name, error } = useFormField()
defineProps({ className: String })
</script>