<script setup lang="ts">
import { useSidebarProvider } from './useSidebar'

useSidebarProvider()
</script>

<template>
  <div class="group/sidebar-wrapper flex min-h-screen w-full">
    <slot />
  </div>
</template>