import { inject } from 'vue'

export function useFormField() {
  const context = inject('formField')
  if (!context) throw new Error('useFormField must be used inside FormFieldContext')
  return context
}