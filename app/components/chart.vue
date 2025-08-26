<template>
  <div
    :class="['flex aspect-video justify-center text-xs', className]"
    data-slot="chart"
    :data-chart="chartId"
    v-bind="$attrs"
  >
    <ChartStyle :id="chartId" :config="config" />
    <ResponsiveContainer>
      <slot />
    </ResponsiveContainer>
  </div>
</template>

<script>
import { ref, provide } from "vue";
import { ResponsiveContainer } from "vue-recharts";

export default {
  name: "Chart",
  props: {
    className: String,
    config: Object,
    id: String,
  },
  setup(props) {
    const chartId = props.id || `chart-${Math.random().toString(36).substr(2)}`;
    provide("chartConfig", props.config);

    return {
      chartId,
    };
  },
  components: {
    ResponsiveContainer,
  },
};
</script>