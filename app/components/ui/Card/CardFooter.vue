<template>
  <div
    data-slot="card-footer"
    :class="['flex items-center px-6 pb-6 [.border-t]:pt-6', className]"
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