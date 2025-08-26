<template>
  <div class="flex gap-4">
    <label
      v-for="option in options"
      :key="option.value"
      class="flex items-center gap-2 cursor-pointer"
    >
      <input
        type="radio"
        :name="name"
        :value="option.value"
        v-model="modelValue"
        class="form-radio"
      />
      <span>{{ option.label }}</span>
    </label>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  options: Array,
  modelValue: String,
});
defineEmits(['update:modelValue']);
</script>
