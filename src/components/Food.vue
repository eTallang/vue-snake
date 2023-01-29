<template>
  <div
    class="food"
    :style="{ 'grid-area': `${coordinate.y + 1} / ${coordinate.x + 1}` }"
  >
    <svg
      width="3"
      height="4"
      viewBox="0 0 3 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.5 0V1M2.5 1V3M0.5 1V3M1.5 3V4" stroke="var(--snake-color)" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { Coordinate } from "../types";

defineProps({
  coordinate: {
    type: Object as PropType<Coordinate>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.food {
  svg {
    display: block;
    height: 100%;
    width: 100%;
    aspect-ratio: 1 / 1;
  }
}
</style>
