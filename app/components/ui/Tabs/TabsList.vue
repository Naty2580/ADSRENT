<script setup lang="ts">
import { TabsList } from '@radix-vue/tabs'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    :class="cn(
      'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex',
      props.class
    )"
  >
    <slot />
  </TabsList>
</template>