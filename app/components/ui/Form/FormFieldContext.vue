<script setup>
import { provide } from 'vue'
const props = defineProps({
  name: String,
  meta: Object,
  error: String,
})

provide('formField', props)
</script>

<template>
  <slot />
</template>