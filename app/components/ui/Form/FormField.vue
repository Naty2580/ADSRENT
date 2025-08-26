<template>
  <Field :name="name" v-slot="{ field, meta, errorMessage }">
    <FormFieldContextProvider :name="name" :meta="meta" :error="errorMessage">
      <slot :field="field" :meta="meta" :error="errorMessage" />
    </FormFieldContextProvider>
  </Field>
</template>

<script setup>
import { Field } from 'vee-validate'
import FormFieldContextProvider from './FormFieldContext.vue'

defineProps({ name: String })
</script>