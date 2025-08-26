<script setup lang="ts">
import { useSidebar } from './useSidebar'

const { toggleSidebar } = useSidebar()
</script>

<template>
  <button
    class="size-7"
    @click="toggleSidebar"
    data-slot="sidebar-trigger"
    aria-label="Toggle Sidebar"
  >
    <PanelLeftIcon />
    <span class="sr-only">Toggle Sidebar</span>
  </button>
</template>