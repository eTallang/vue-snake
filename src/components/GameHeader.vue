<template>
  <div class="game-header">
    <div>Player 1</div>
    <div>Score: {{ score }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  score: Number,
});
</script>

<style scoped>
.game-header {
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
}
</style>
