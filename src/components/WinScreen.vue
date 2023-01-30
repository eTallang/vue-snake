<template>
  <div class="win-container">
    <h1 class="flash">I... I cant belive it!</h1>
    <p>You actually finished the game! Good job!</p>
  </div>
</template>

<style scoped>
@keyframes flash {
  0%,
  50% {
    opacity: 1;
  }

  71%,
  100% {
    opacity: 0;
  }
}

.flash {
  animation: flash 0.8s infinite;
}

.win-container {
  grid-row: 1 / -1;
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 1.5rem;
}

p {
  font-size: 0.875rem;
  margin-bottom: 64px;
}
</style>
