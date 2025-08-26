<script setup lang="ts">
import { useSidebar } from './useSidebar'
import { computed } from 'vue'

defineProps<{
  isActive?: boolean
  tooltip?: string
}>()

const { state, isMobile } = useSidebar()

const showTooltip = computed(() => state.value === 'collapsed' && !isMobile.value)
</script>

<template>
  <Tooltip v-if="tooltip && showTooltip">
    <TooltipTrigger>
      <button class="peer/menu-button flex w-full items-center gap-2 p-2">
        <slot />
      </button>
    </TooltipTrigger>
    <TooltipContent side="right" align="center">{{ tooltip }}</TooltipContent>
  </Tooltip>

  <button v-else class="peer/menu-button flex w-full items-center gap-2 p-2">
    <slot />
  </button>
</template>