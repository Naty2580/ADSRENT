<template>
  <component
    :is="asChild ? tag : 'a'"
    data-slot="breadcrumb-link"
    :class="['hover:text-foreground transition-colors', className]"
    v-bind="attrs"
  >
    <slot />
  </component>
</template>

<script setup>
import { useAttrs } from 'vue'

const props = defineProps({
  asChild: Boolean,
  tag: {
    type: String,
    default: 'a',
  },
  className: String,
})

const attrs = useAttrs()
</script>