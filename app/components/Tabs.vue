<script setup>
import { provide, ref } from 'vue';

const props = defineProps({
  defaultValue: {
    type: String,
    required: true,
  },
});

const model = defineModel()

const activeTab = ref(model.value || props.defaultValue);

function selectTab(value) {
  activeTab.value = value;
  model.value = value
}

provide('activeTab', activeTab);
provide('selectTab', selectTab);
</script>

<template>
  <div>
    <slot />
  </div>
</template>