<script setup lang="ts">
import { inject } from 'vue'
import { XIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<{
  side?: 'top' | 'right' | 'bottom' | 'left'
  class?: string
}>()

const sheetOpen = inject('sheetOpen') as Ref<boolean>
const toggleSheet = inject('toggleSheet') as (val: boolean) => void

const side = props.side || 'right'
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="sheetOpen"
        data-slot="sheet-overlay"
        class="fixed inset-0 z-50 bg-black/50"
        @click.self="toggleSheet(false)"
      />
    </transition>

    <transition :name="`slide-${side}`">
      <div
        v-if="sheetOpen"
        data-slot="sheet-content"
        :class="cn(
          'fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out',
          side === 'right' && 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
          side === 'left' && 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
          side === 'top' && 'inset-x-0 top-0 h-auto border-b',
          side === 'bottom' && 'inset-x-0 bottom-0 h-auto border-t',
          props.class
        )"
      >
        <button
          data-slot="sheet-close"
          class="absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2"
          @click="toggleSheet(false)"
        >
          <XIcon class="size-4" />
          <span class="sr-only">Close</span>
        </button>
        <slot />
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}
.slide-right-enter-from {
  transform: translateX(100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}

/* Add similar transitions for slide-left, slide-top, slide-bottom if needed */
</style>