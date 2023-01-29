<template>
  <div
    class="snake-part"
    :style="{
      'grid-area': `${coordinate.y + 1} / ${coordinate.x + 1}`,
    }"
  ></div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { Coordinate } from "../types";

defineProps({
  coordinate: { type: Object as PropType<Coordinate>, required: true },
});
</script>

<style scoped>
.snake-part {
  background-color: var(--snake-color);
}
</style>
