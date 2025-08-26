<template>
  <PaginationLink
    aria-label="Go to previous page"
    :class="['gap-1 px-2.5 sm:pl-2.5', className]"
  >
    <ChevronLeftIcon />
    <span class="hidden sm:block">Previous</span>
  </PaginationLink>
</template>

<script setup>
import PaginationLink from './PaginationLink.vue'
import {ChevronLeftIcon} from 'lucide-vue-next'
defineProps({ className: String })
</script>