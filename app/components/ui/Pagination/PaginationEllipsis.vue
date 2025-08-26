<template>
  <span
    aria-hidden
    data-slot="pagination-ellipsis"
    :class="['flex size-9 items-center justify-center', className]"
  >
    <MoreHorizontalIcon class="size-4" />
    <span class="sr-only">More pages</span>
  </span>
</template>

<script setup>
import {MoreHorizontalIcon} from 'lucide-vue-next'
defineProps({ className: String })
</script>