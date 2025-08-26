<template>
  <span
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    aria-hidden="true"
    :class="['flex size-9 items-center justify-center', className]"
  >
    <MoreHorizontal class="size-4" />
    <span class="sr-only">More</span>
  </span>
</template>

<script setup>
import { MoreHorizontal } from 'lucide-vue-next'
const props = defineProps({ className: String })
</script>