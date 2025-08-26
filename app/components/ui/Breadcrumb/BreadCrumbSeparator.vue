<template>
  <li
    data-slot="breadcrumb-separator"
    role="presentation"
    aria-hidden="true"
    :class="['[&>svg]:size-3.5', className]"
  >
    <slot>
      <ChevronRight />
    </slot>
  </li>
</template>

<script setup>
import { ChevronRight } from 'lucide-vue-next'
const props = defineProps({ className: String })
</script>