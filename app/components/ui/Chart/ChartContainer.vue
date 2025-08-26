<template>
  <div
    :data-chart="chartId"
    data-slot="chart"
    class="flex aspect-video justify-center text-xs"
    :class="[
      '[&_.axis-tick]:fill-muted-foreground [&_.grid-line]:stroke-border/50 [&_.tooltip-cursor]:stroke-border [&_.radial-bg]:fill-muted [&_.tooltip-rect]:fill-muted [&_.reference-line]:stroke-border [&_.dot]:stroke-transparent [&_.layer]:outline-hidden [&_.sector]:outline-hidden [&_.surface]:outline-hidden',
      className,
    ]"
  >
    <ChartStyle :id="chartId" :config="config" />
    <slot />
  </div>
</template>

<script setup>
import { computed, provide } from 'vue'
import ChartStyle from './ChartStyle.vue'

const props = defineProps({
  id: String,
  className: String,
  config: Object,
})

const chartId = computed(() => props.id || `chart-${Math.random().toString(36).slice(2)}`)

provide('chartConfig', props.config)
</script>