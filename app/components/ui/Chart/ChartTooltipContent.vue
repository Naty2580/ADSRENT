<template>
  <div
    v-if="active && payload?.length"
    class="border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl"
    :class="className"
  >
    <div v-if="!nestLabel">{{ tooltipLabel }}</div>
    <div class="grid gap-1.5">
      <div
        v-for="(item, index) in payload"
        :key="item.dataKey"
        class="flex w-full flex-wrap items-stretch gap-2"
        :class="indicator === 'dot' ? 'items-center' : ''"
      >
        <component
          :is="getIcon(item)"
          v-if="getIcon(item) && !hideIndicator"
          class="h-2.5 w-2.5 text-muted-foreground"
        />
        <div class="flex flex-1 justify-between leading-none" :class="nestLabel ? 'items-end' : 'items-center'">
          <div class="grid gap-1.5">
            <div v-if="nestLabel">{{ tooltipLabel }}</div>
            <span class="text-muted-foreground">{{ getLabel(item) }}</span>
          </div>
          <span v-if="item.value" class="text-foreground font-mono font-medium tabular-nums">
            {{ item.value.toLocaleString() }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  active: Boolean,
  payload: Array,
  className: String,
  indicator: { type: String, default: 'dot' },
  hideLabel: Boolean,
  hideIndicator: Boolean,
  label: String,
  labelFormatter: Function,
  labelClassName: String,
  formatter: Function,
  color: String,
  nameKey: String,
  labelKey: String,
})

const config = inject('chartConfig')

const tooltipLabel = computed(() => {
  if (props.hideLabel || !props.payload?.length) return null
  const item = props.payload[0]
  const key = props.labelKey || item?.dataKey || item?.name || 'value'
  const itemConfig = config?.[key]
  const value = props.label || itemConfig?.label
  return props.labelFormatter ? props.labelFormatter(value, props.payload) : value
})

const nestLabel = computed(() => props.payload?.length === 1 && props.indicator !== 'dot')

function getIcon(item) {
  const key = props.nameKey || item.name || item.dataKey || 'value'
  return config?.[key]?.icon || null
}

function getLabel(item) {
  const key = props.nameKey || item.name || item.dataKey || 'value'
  return config?.[key]?.label || item.name
}
</script>