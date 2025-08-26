<template>
  <Form :validation-schema="validationSchema" @submit="handleSubmit">
    <slot />
  </Form>
</template>

<script setup lang="ts">
import { Form, useForm } from 'vee-validate'

// Props
const props = defineProps<{
  onSubmit: (values: any) => void
}>()

// Set up form
const { handleSubmit } = useForm()

// Wrap submit handler
const handleSubmitForm = handleSubmit((values) => {
  props.onSubmit(values)
})
</script>