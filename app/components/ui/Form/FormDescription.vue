<template>
  <p
    data-slot="form-description"
    :id="`${name}-desc`"
    class="text-muted-foreground text-sm"
    :class="className"
  >
    <slot />
  </p>
</template>

<script setup>
import { useFormField } from '../useFormField'
const { name } = useFormField()
defineProps({ className: String })
</script>