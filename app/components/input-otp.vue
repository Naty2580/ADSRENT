<template>
  <div class="flex gap-2">
    <input
      v-for="(val, index) in digits"
      :key="index"
      maxlength="1"
      class="otp-box"
      v-model="digits[index]"
      @input="focusNext(index)"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const digits = ref(['', '', '', '', '', '']);
const emit = defineEmits(['update']);

const focusNext = (index) => {
  if (digits.value[index] && index < 5) {
    const next = document.querySelectorAll('.otp-box')[index + 1];
    next?.focus();
  }
};

watch(digits, () => {
  emit('update', digits.value.join(''));
});
</script>

<style scoped>
.otp-box {
  width: 2rem;
  height: 2rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
