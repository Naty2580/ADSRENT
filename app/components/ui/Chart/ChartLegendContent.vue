<template>
  <div
    v-if="payload?.length"
    class="flex items-center justify-center gap-4"
    :class="verticalAlign === 'top' ? 'pb-3' : 'pt-3'"
  >
    <div
      v-for="item in payload"
      :key="item.value"
      class="flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 text-muted-foreground"
    >
      <component
        :is="getIcon(item)"
        v-if="getIcon(item) && !hideIcon"
      />
      <div
        v-else
        class="h-2 w-2 shrink-0 rounded-[2px]"
        :style="{ backgroundColor: item.color }"
      />
      {{ getLabel(item) }}
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const props = defineProps({
  className: String,
  hideIcon: Boolean,
  payload: Array,
  verticalAlign: { type: String, default: 'bottom' },
  nameKey: String,
})

const config = inject('chartConfig')

function getIcon(item) {
  const key = props.nameKey || item.dataKey || 'value'
  return config?.[key]?.icon || null
}

function getLabel(item) {
  const key = props.nameKey || item.dataKey || 'value'
  return config?.[key]?.label || item.value
}
</script>