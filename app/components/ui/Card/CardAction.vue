<template>
  <div
    data-slot="card-action"
    :class="[
      'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
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