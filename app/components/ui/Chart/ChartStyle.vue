<template>
  <div>
    <template v-for="(prefix, theme) in THEMES">
      {{ prefix }} [data-chart="{{ id }}"] {
        <template v-for="(item, key) in config">
          <template v-if="item.theme?.[theme] || item.color">
            --color-{{ key }}: {{ item.theme?.[theme] || item.color }};
          </template>
        </template>
      }
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  id: String,
  config: Object,
})

const THEMES = {
  light: '',
  dark: '.dark',
}
</script>