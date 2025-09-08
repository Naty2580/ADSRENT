<template>
  <div data-slot="context-menu" @contextmenu.prevent="open = true" ref="trigger">
    <slot name="trigger" />
    <teleport to="body">
      <div
        v-if="open"
        data-slot="context-menu-content"
        class="z-50 min-w-[8rem] rounded-md border p-1 shadow-md bg-popover text-popover-foreground absolute"
        :style="{ top: `${y}px`, left: `${x}px` }"
        @click="open = false"
      >
        <slot />
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)
const x = ref(0)
const y = ref(0)

const trigger = ref(null)

function handleContextMenu(e) {
  x.value = e.clientX
  y.value = e.clientY
  open.value = true
}

onMounted(() => {
  trigger.value?.addEventListener('contextmenu', handleContextMenu)
})
</script>