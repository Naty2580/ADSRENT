<template>
  <PaginationLink
    aria-label="Go to next page"
    :class="['gap-1 px-2.5 sm:pr-2.5', className]"
  >
    <span class="hidden sm:block">Next</span>
    <ChevronRightIcon />
  </PaginationLink>
</template>

<script setup>
import PaginationLink from './PaginationLink.vue'
import {ChevronRightIcon} from 'lucide-vue-next'
defineProps({ className: String })
</script>