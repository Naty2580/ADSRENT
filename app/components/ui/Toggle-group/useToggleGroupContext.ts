import { inject, provide } from 'vue'
import type { VariantProps } from 'class-variance-authority'
import { toggleVariants } from '@/components/ui/toggle'

export type ToggleGroupContext = VariantProps<typeof toggleVariants>

const key = Symbol('ToggleGroupContext')

export function provideToggleGroupContext(context: ToggleGroupContext) {
  provide(key, context)
}

export function useToggleGroupContext(): ToggleGroupContext {
  return inject(key, { variant: 'default', size: 'default' })
}