<template>
  <div class="app-container">
    <h1 class="title">Snake</h1>
    <computer-chassis>
      <computer-screen>
        <snake-game />
      </computer-screen>
    </computer-chassis>
  </div>
</template>

<script setup lang="ts">
import ComputerChassis from "./components/ComputerChassis.vue";
import ComputerScreen from "./components/ComputerScreen.vue";
import SnakeGame from "./components/SnakeGame.vue";
</script>

<style scoped>
.app-container {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title {
  letter-spacing: 3vw;
  font-size: 1.5rem;
  color: var(--background-color);
  margin-bottom: 3rem;
  margin-right: -3vw;
}
</style>
