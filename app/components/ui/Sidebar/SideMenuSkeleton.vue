<script setup lang="ts">
import { ref, onMounted } from 'vue'

const width = ref('70%')

onMounted(() => {
  width.value = `${Math.floor(Math.random() * 40) + 50}%`
})
</script>

<template>
  <div
    data-slot="sidebar-menu-skeleton"
    data-sidebar="menu-skeleton"
    class="flex h-8 items-center gap-2 rounded-md px-2"
  >
    <Skeleton class="size-4 rounded-md" />
    <Skeleton class="h-4 flex-1" :style="{ maxWidth: width }" />
  </div>
</template>