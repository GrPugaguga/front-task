<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue';

const props = defineProps<{
  modelValue: number;
}>();

const emit = defineEmits(['update:modelValue', 'focus', 'blur']);

const inputRef = ref<HTMLInputElement | null>(null);
const hiddenSpanRef = ref<HTMLSpanElement | null>(null);
const currentInputWidth = ref(72); // Initial width

const displayValue = ref('');

const formatNumber = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const parseNumber = (value: string) => {
  return parseInt(value.replace(/\s/g, ''), 10);
};

watch(() => props.modelValue, (newValue) => {
  displayValue.value = formatNumber(newValue);
}, { immediate: true });

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  event.preventDefault(); // Prevent default input behavior

  const oldRawValue = input.value.replace(/\s/g, ''); // Raw value without spaces
  const oldCursorPos = input.selectionStart || 0;

  let cleanedValue = input.value.replace(/\D/g, '');

  const numericValue = parseNumber(cleanedValue) || 0;
  emit('update:modelValue', numericValue);

  const formattedNewValue = formatNumber(numericValue);

  const oldFormattedLength = displayValue.value.length;
  const newFormattedLength = formattedNewValue.length;

  let newCursorPos = oldCursorPos + (formattedNewValue.length - cleanedValue.length) - (displayValue.value.length - oldRawValue.length);

  newCursorPos = Math.min(newCursorPos, newFormattedLength);
  newCursorPos = Math.max(newCursorPos, 0);

  displayValue.value = formattedNewValue;

  nextTick(() => {
    input.value = formattedNewValue; // Explicitly set input value
    input.setSelectionRange(newCursorPos, newCursorPos);
    updateInputWidth();
  });
};

const updateInputWidth = () => {
  if (hiddenSpanRef.value) {
    hiddenSpanRef.value.textContent = displayValue.value;
    const newWidth = hiddenSpanRef.value.scrollWidth + 32; // Add padding for input
    currentInputWidth.value = Math.max(72, newWidth);
  }
};

import { watchEffect } from 'vue';
watchEffect(() => {
  updateInputWidth();
});

const isFocused = ref(false);

const handleFocus = () => {
  isFocused.value = true;
  emit('focus');
};

const handleBlur = () => {
  isFocused.value = false;
  emit('blur');
};

</script>

<template>
  <div class="relative inline-block">
    <input
      ref="inputRef"
      type="text"
      :value="displayValue"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      class="h-11 rounded-md border-[1.5px] pl-2 pr-4 py-2 text-left font-sans text-lg font-medium outline-none transition-colors duration-300 ease-in-out caret-primary"
      :class="[isFocused ? 'border-primary-light text-dark' : 'border-light-grey text-dark']"
      :style="{ width: currentInputWidth + 'px' }"
    />
    <span
      ref="hiddenSpanRef"
      class="absolute left-0 top-0 invisible whitespace-nowrap pl-2 pr-4 py-2 text-lg font-medium font-sans"
    ></span>
  </div>
</template>

