<template>
  <div
    data-slot="drawer-content"
    :class="[
      'group/drawer-content bg-background fixed z-50 flex flex-col h-auto',
      directionClasses[direction],
    ]"
  >
    <div
      v-if="direction === 'bottom'"
      class="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-[data-slot=drawer-content]:block"
    />
    <slot />
    <button
      data-slot="drawer-close"
      class="absolute top-4 right-4 opacity-70 hover:opacity-100 transition-opacity"
      @click="$emit('close')"
    >
      <span class="sr-only">Close</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  direction: {
    type: String,
    default: 'bottom',
  },
})

const directionClasses = {
  top: 'inset-x-0 top-0 mb-24 max-h-[80vh] rounded-b-lg border-b',
  bottom: 'inset-x-0 bottom-0 mt-24 max-h-[80vh] rounded-t-lg border-t',
  left: 'inset-y-0 left-0 w-3/4 sm:max-w-sm border-r',
  right: 'inset-y-0 right-0 w-3/4 sm:max-w-sm border-l',
}
</script>