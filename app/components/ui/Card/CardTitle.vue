<template>
  <h4 data-slot="card-title" :class="['leading-none', className]" v-bind="attrs">
    <slot />
  </h4>
</template>

<script setup>
import { useAttrs } from 'vue'
defineProps({ className: String })
const attrs = useAttrs()
</script>