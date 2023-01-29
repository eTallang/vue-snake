<template>
  <div class="game-header">
    <div>Highscore: {{ highScore }}</div>
    <div>Score: {{ score }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ScoreEntry } from "../types";

defineProps({
  score: Number,
});

const highScore = ref(0);

onMounted(() => {
  const existingScores = localStorage.getItem("snakeScores");
  if (existingScores) {
    const scores: ScoreEntry[] = JSON.parse(existingScores);

    highScore.value = Math.max(...scores.map((score) => score.score));
  }
});
</script>

<style scoped>
.game-header {
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
}
</style>
