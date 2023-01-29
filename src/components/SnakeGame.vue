<template>
  <div class="game-container">
    <game-header :score="snakeParts.length - 2" />
    <div
      class="game-area"
      :style="{
        'grid-template-columns': `repeat(${gridSizeX}, minmax(0, 1fr))`,
        'grid-template-rows': `repeat(${gridSizeY}, minmax(0, 1fr))`,
      }"
    >
      <death-screen v-if="isDead" :newScore="snakeParts.length - 2" />
      <template v-else>
        <snake-part
          v-for="(part, index) in snakeParts"
          :key="index"
          :coordinate="part"
        />
        <food v-if="foodPosition" :coordinate="foodPosition" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { Coordinate } from "../types";
import SnakePart from "./SnakePart.vue";
import DeathScreen from "./DeathScreen.vue";
import Food from "./Food.vue";
import GameHeader from "./GameHeader.vue";
import { useArrowKeyListener } from "./useArrowKeyListener";

const gridSizeY = 5;
const gridSizeX = 8;
const direction = useArrowKeyListener();

const getRandomPosition = (): Coordinate => {
  return {
    x: Math.floor(Math.random() * gridSizeX),
    y: Math.floor(Math.random() * gridSizeY),
  };
};

const isDead = ref(false);
const snakeAteFood = ref(false);
const foodPosition = ref<Coordinate | undefined>(getRandomPosition());
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
    head.value.x >= gridSizeX ||
    head.value.y >= gridSizeY
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
    head.value.x === foodPosition.value?.x &&
    head.value.y === foodPosition.value.y;

  if (snakeAte) {
    createNewFoodPosition();
  }
  snakeAteFood.value = snakeAte;
};

const createNewFoodPosition = () => {
  if (snakeParts.value.length === gridSizeX * gridSizeY) {
    foodPosition.value = undefined;
  } else {
    foodPosition.value = getRandomPosition();
    while (
      snakeParts.value.some(
        (part) =>
          part.x === foodPosition.value?.x && part.y === foodPosition.value.y
      )
    ) {
      foodPosition.value = getRandomPosition();
    }
  }
};

onMounted(() => {
  setInterval(() => {
    moveSnake();
    checkIfSnakeCrashedWithWall();
    checkIfSnakeCrashedWithItself();
    checkIfSnakeAteFood();
  }, 300);
});
</script>

<style scoped lang="scss">
.game-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url("../assets/screen.png");
    mix-blend-mode: overlay;
    filter: invert(0.7);
    pointer-events: none;
  }
}

.game-area {
  width: 100%;
  flex: 1;
  border: 4px solid var(--snake-color);
  display: grid;
}
</style>
