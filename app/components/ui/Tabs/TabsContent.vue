<script setup lang="ts">
import { TabsContent } from '@radix-vue/tabs'
import { cn } from '@/lib/utils'

const props = defineProps<{
  value: string
  class?: string
  forceMount?: boolean
}>()
</script>

<template>
  <TabsContent
    :value="props.value"
    :force-mount="props.forceMount"
    :class="cn('flex-1 outline-none', props.class)"
    data-slot="tabs-content"
  >
    <slot />
  </TabsContent>
</template>