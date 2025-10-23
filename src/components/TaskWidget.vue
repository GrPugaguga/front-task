<script setup lang="ts">
import { ref } from 'vue';
import Avatar from './Avatar.vue';
import Label from './Label.vue';
import NumericInput from './NumericInput.vue';

const numericValue = ref(7);
const isInputFocused = ref(false);

const handleInputUpdate = (value: number) => {
  numericValue.value = value;
};

const handleInputFocus = () => {
  isInputFocused.value = true;
};

const handleInputBlur = () => {
  isInputFocused.value = false;
};

</script>

<template>
  <div class="flex items-center gap-4">
    <Avatar :src="'/avatar.jpg'" :active="isInputFocused" class="shrink-0" />
    <div class="flex flex-col gap-3">
      <Label :active="isInputFocused" />
      <div class="flex items-center gap-3">
        <NumericInput
          :model-value="numericValue"
          @update:model-value="handleInputUpdate"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
        />
        <span class="font-sans text-lg font-normal text-dark">hours old</span>
      </div>
    </div>
  </div>
</template>
