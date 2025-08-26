<script setup lang="ts">
import { TabsRoot } from '@radix-vue/tabs'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
  defaultValue?: string
  value?: string
  orientation?: 'horizontal' | 'vertical'
  dir?: 'ltr' | 'rtl'
}>
</script>

<template>
  <TabsRoot
    data-slot="tabs"
    :class="cn('flex flex-col gap-2', props.class)"
    v-bind="props"
  >
    <slot />
  </TabsRoot>
</template>