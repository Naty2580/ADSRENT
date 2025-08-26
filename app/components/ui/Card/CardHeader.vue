<template>
  <div
    data-slot="card-header"
    :class="[
      '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
      className,
    ]"
    v-bind="attrs"
  >
    <slot />
  </div>
</template>

<script setup>
import { useAttrs } from 'vue'
defineProps({ className: String })
const attrs = useAttrs()
</script>