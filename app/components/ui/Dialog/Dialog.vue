<template>
  <div data-slot="dialog">
    <slot name="trigger" :open="open" @click="open = true" />
    <teleport to="body">
      <transition name="fade">
        <div v-if="open" class="fixed inset-0 z-50">
          <DialogOverlay @click="open = false" />
          <DialogContent @close="open = false">
            <slot />
          </DialogContent>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DialogOverlay from './DialogOverlay.vue'
import DialogContent from './DialogContent.vue'

const open = ref(false)
</script>