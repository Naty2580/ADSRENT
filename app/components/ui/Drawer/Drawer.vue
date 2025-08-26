<template>
  <div data-slot="drawer">
    <slot name="trigger" :open="open" @click="open = true" />
    <teleport to="body">
      <transition name="fade">
        <div v-if="open" class="fixed inset-0 z-50">
          <DrawerOverlay @click="open = false" />
          <DrawerContent :direction="direction" @close="open = false">
            <slot />
          </DrawerContent>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DrawerOverlay from './DrawerOverlay.vue'
import DrawerContent from './DrawerContent.vue'

const open = ref(false)
defineProps({
  direction: {
    type: String,
    default: 'bottom', // 'top' | 'bottom' | 'left' | 'right'
  },
})
</script>