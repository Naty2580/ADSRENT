<!-- RadioGroup.vue -->
<script setup>
import { useAttrs } from 'vue'
import { cn } from '@/lib/cn.ts'

const attrs = useAttrs()
</script>

<template>
  <div
    data-slot="radio-group"
    class="grid grid-cols-3 gap-2"
    :class="attrs.class"
    v-bind="attrs"
  >
    <slot />
  </div>
</template>