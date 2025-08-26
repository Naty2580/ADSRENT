<template>
  <p
    data-slot="card-description"
    :class="['text-muted-foreground', className]"
    v-bind="attrs"
  >
    <slot />
  </p>
</template>

<script setup>
import { useAttrs } from 'vue'
defineProps({ className: String })
const attrs = useAttrs()
</script>