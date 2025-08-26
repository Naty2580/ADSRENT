<template>
  <div
    :class="['bg-card text-card-foreground flex flex-col gap-6 rounded-xl border', className]"
    data-slot="card"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    className: String,
  },
};
</script>