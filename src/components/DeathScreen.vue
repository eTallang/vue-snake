<template>
  <div class="death-container">
    <h1>You died!</h1>
    <p class="retry-description">Press "Cmd + r" to restart.</p>
    <template v-if="showNameInput">
      <h1>New highscore!</h1>
      <name-input @on-submit="onNameEntry" />
    </template>
    <template v-else>
      <h1>Highscore</h1>
      <div
        class="score-entry"
        v-for="scoreEntry in scores"
        :key="`${scoreEntry.name}${scoreEntry.score}`"
      >
        <div>{{ scoreEntry.name }}</div>
        <div>{{ scoreEntry.score }}</div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { ScoreEntry } from "../types";
import NameInput from "./NameInput.vue";

const props = defineProps({
  newScore: { type: Number, required: true },
});

const scores = ref<ScoreEntry[]>([]);
const showNameInput = ref(false);

const onNameEntry = (name: string) => {
  let scoresCopy = scores.value.slice();
  scoresCopy.push({ name: name, score: props.newScore });
  scoresCopy.sort((a, b) => b.score - a.score);
  scoresCopy = scoresCopy.slice(0, 5);
  localStorage.setItem("snakeScores", JSON.stringify(scoresCopy));
  scores.value = scoresCopy;
  showNameInput.value = false;
};

onMounted(() => {
  const existingScores = localStorage.getItem("snakeScores");
  if (existingScores) {
    scores.value = JSON.parse(existingScores);

    if (
      props.newScore > scores.value[scores.value.length - 1].score ||
      existingScores.length < 5
    ) {
      showNameInput.value = true;
    }
  } else {
    showNameInput.value = true;
  }
});
</script>

<style scoped>
.death-container {
  grid-row: 1 / -1;
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 3rem;
}

.retry-description {
  margin-bottom: 32px;
}

p {
  font-size: 2rem;
}

.score-entry {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  width: 100%;
  max-width: 360px;
  font-size: 2rem;
  text-transform: uppercase;
}
</style>
