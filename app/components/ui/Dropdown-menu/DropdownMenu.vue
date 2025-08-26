<template>
  <div data-slot="dropdown-menu" class="relative inline-block">
    <slot name="trigger" :open="open" @click="toggle" />
    <teleport to="body">
      <transition name="fade">
        <div
          v-if="open"
          data-slot="dropdown-menu-content"
          class="absolute z-50 min-w-[8rem] rounded-md border p-1 shadow-md bg-popover text-popover-foreground"
          :style="{ top: `${y}px`, left: `${x}px` }"
          @click="open = false"
        >
          <slot />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)
const x = ref(0)
const y = ref(0)

function toggle(event) {
  open.value = !open.value
  x.value = event.clientX
  y.value = event.clientY
}
</script>