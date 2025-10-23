<script setup lang="ts">

defineProps<{
  active: boolean;
}>();

</script>

<template>
  <label
    class="font-display font-normal text-base leading-[15px] tracking-[.02em] transition-colors duration-300 ease-in-out"
    :class="[active ? 'text-primary' : 'text-dark']"
  >
    SAMUEL IS
  </label>
</template>
