<template>
  <div class="computer-screen">
    <slot />
  </div>
</template>

<style lang="scss">
.computer-screen {
  border-radius: calc(var(--border-radius) / 2);
  height: 100%;
  background-color: var(--background-color);
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 50px rgb(0 0 0 / 0.6), inset 0 0 10px rgb(0 0 0 / 0.7),
    0 0 100px rgba(78, 209, 183, 0.3);

  // General gradient
  &::after {
    content: "";
    position: absolute;
    mix-blend-mode: overlay;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: radial-gradient(rgb(255 255 255 / 1), rgb(0 0 0 / 0.4));
    pointer-events: none;
  }

  // Shine
  &::before {
    content: "";
    position: absolute;
    mix-blend-mode: overlay;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: radial-gradient(
      rgb(0 255 194 / 40%),
      rgba(255, 255, 255, 0) 80%
    );
    pointer-events: none;
  }
}
</style>
