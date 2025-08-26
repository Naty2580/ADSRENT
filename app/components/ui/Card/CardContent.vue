<template>
  <div
    data-slot="card-content"
    :class="['px-6 [&:last-child]:pb-6', className]"
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