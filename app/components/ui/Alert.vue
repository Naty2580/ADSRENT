<template>
  <div
    role="alert"
    data-slot="alert"
    :class="computedClasses"
  >
    <slot name="icon" />
    <div class="col-start-2">
      <div
        v-if="title"
        data-slot="alert-title"
        class="line-clamp-1 min-h-4 font-medium tracking-tight"
      >
        {{ title }}
      </div>
      <div
        v-if="description"
        data-slot="alert-description"
        class="text-muted-foreground grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed"
      >
        <p>{{ description }}</p>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { cn } from '@/utils' // Adjust path if needed

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
  },
  title: String,
  description: String,
  className: String,
})

const baseClasses =
  'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current'

const variants = {
  default: 'bg-card text-card-foreground',
  destructive:
    'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
}

const computedClasses = computed(() =>
  cn(baseClasses, variants[props.variant], props.className)
)
</script>