<script setup lang="ts">

defineProps<{
  src: string;
  active: boolean;
}>();

</script>

<template>
  <div class="relative w-20 h-20 rounded-full flex items-center justify-center overflow-visible">
    <div
      v-if="active"
      class="absolute inset-[-4px] border border-primary rounded-full transition-all duration-300 ease-out"
    ></div>
    <img :src="src" alt="avatar" class="w-20 h-20 rounded-full object-cover" />
  </div>
</template>
