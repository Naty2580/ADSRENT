<script setup lang="ts">
import { useSidebar } from './useSidebar'

const { isMobile, openMobile, state } = useSidebar()
</script>

<template>
  <div
    v-if="!isMobile"
    class="hidden md:block"
    :data-state="state"
    data-slot="sidebar"
  >
    <div class="relative w-[var(--sidebar-width)] bg-transparent transition-all">
      <!-- Sidebar container -->
      <div class="fixed inset-y-0 z-10 h-screen w-[var(--sidebar-width)] flex">
        <div class="bg-sidebar flex h-full w-full flex-col rounded-lg border shadow-sm">
          <slot />
        </div>
      </div>
    </div>
  </div>

  <Sheet v-else :open="openMobile">
    <SheetContent class="bg-sidebar w-[var(--sidebar-width-mobile)] p-0">
      <div class="flex h-full w-full flex-col">
        <slot />
      </div>
    </SheetContent>
  </Sheet>
</template>