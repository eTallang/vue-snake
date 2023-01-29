<template>
  <div class="screen">
    <game-header :score="snakeParts.length - 2" />
    <div
      class="game-area"
      :style="{
        'grid-template-columns': `repeat(${gridSize}, minmax(0, 1fr))`,
        'grid-template-rows': `repeat(${gridSize}, minmax(0, 1fr))`,
      }"
    >
      <death-screen v-if="isDead" :newScore="snakeParts.length - 2" />
      <template v-else>
        <snake-part
          v-for="(part, index) in snakeParts"
          :key="index"
          :coordinate="part"
        />
        <food :coordinate="foodPosition" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { Coordinate } from "./types";
import SnakePart from "./components/SnakePart.vue";
import DeathScreen from "./components/DeathScreen.vue";
import Food from "./components/Food.vue";
import GameHeader from "./components/GameHeader.vue";
import { useArrowKeyListener } from "./components/useArrowKeyListener";

const gridSize = 20;
const direction = useArrowKeyListener();

const getRandomPosition = (): Coordinate => {
  return {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  };
};

const isDead = ref(false);
const snakeAteFood = ref(false);
const foodPosition = ref<Coordinate>(getRandomPosition());
const snakeParts = ref<Coordinate[]>([
  { x: 0, y: 0 },
  { x: 1, y: 0 },
]);

const head = computed(() => snakeParts.value[snakeParts.value.length - 1]);

const moveSnake = (): void => {
  const listClone = snakeParts.value.slice();

  if (direction.value === "right") {
    listClone.push({ y: head.value.y, x: head.value.x + 1 });
  } else if (direction.value === "down") {
    listClone.push({ y: head.value.y + 1, x: head.value.x });
  } else if (direction.value === "left") {
    listClone.push({ y: head.value.y, x: head.value.x - 1 });
  } else {
    listClone.push({ y: head.value.y - 1, x: head.value.x });
  }

  if (!snakeAteFood.value) {
    listClone.shift();
  }

  snakeParts.value = listClone;
};

const checkIfSnakeCrashedWithWall = (): void => {
  if (
    head.value.x < 0 ||
    head.value.y < 0 ||
    head.value.x > gridSize ||
    head.value.y > gridSize
  ) {
    isDead.value = true;
  }
};

const checkIfSnakeCrashedWithItself = (): void => {
  const snakeWithoutBody = snakeParts.value.slice();
  snakeWithoutBody.pop();
  if (
    snakeWithoutBody.some(
      (part) => part.x === head.value.x && part.y === head.value.y
    )
  ) {
    isDead.value = true;
  }
};

const checkIfSnakeAteFood = (): void => {
  const snakeAte =
    head.value.x === foodPosition.value.x &&
    head.value.y === foodPosition.value.y;

  if (snakeAte) {
    foodPosition.value = getRandomPosition();
  }
  snakeAteFood.value = snakeAte;
};

onMounted(() => {
  setInterval(() => {
    moveSnake();
    checkIfSnakeCrashedWithWall();
    checkIfSnakeCrashedWithItself();
    checkIfSnakeAteFood();
  }, 120);
});
</script>

<style scoped>
.screen {
  display: inline-block;
  background-color: var(--background-color);
  padding: 8px;
}

.screen::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url("./assets/screen.png");
  mix-blend-mode: overlay;
  filter: invert(0.7);
  pointer-events: none;
}

.game-area {
  width: 500px;
  aspect-ratio: 1 / 1;
  border: 4px solid var(--snake-color);
  display: grid;
}
</style>
