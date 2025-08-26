<template>
  <slot
    :id="name"
    :aria-invalid="!!error"
    :aria-describedby="error ? `${name}-desc ${name}-msg` : `${name}-desc`"
  />
</template>

<script setup>
import { useFormField } from  '@/components/ui/useFormField.ts'
const { name, error } = useFormField()
</script>