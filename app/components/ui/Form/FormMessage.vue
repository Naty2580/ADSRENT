<template>
  <p
    v-if="error"
    data-slot="form-message"
    :id="`${name}-msg`"
    class="text-destructive text-sm"
    :class="className"
  >
    {{ error }}
  </p>
</template>

<script setup>
import { useFormField } from '@/components/ui/useFormField.ts'
const { name, error } = useFormField()
defineProps({ className: String })
</script>