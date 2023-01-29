<template>
  <div class="computer-chassis">
    <div class="shadow"></div>
    <div class="computer-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.computer-chassis {
  --thickness: 6vmin;
  --border-radius: 4vmin;
  box-sizing: border-box;
  aspect-ratio: 1.3 / 1;
  width: min(calc(100vmin - 6rem), 1000px);
  background: radial-gradient(rgb(40 40 40 / 1) 60%, rgb(30 30 30 / 1));
  padding: var(--thickness);
  border-radius: var(--border-radius);
  position: relative;
  box-shadow: 0 0 80px rgb(0 0 0 / 0.3), 0 0 20px rgb(0 0 0 / 0);
  margin: 0 auto;
  // Outer highlight
  &::after {
    --offset: -1px;
    --outer-light: rgb(82, 82, 82);

    z-index: -1;
    content: "";
    position: absolute;
    top: var(--offset);
    right: var(--offset);
    bottom: var(--offset);
    left: var(--offset);
    border-radius: calc(var(--border-radius) + 1px);
    background: linear-gradient(
      var(--outer-light),
      rgb(40 40 40 / 1),
      var(--outer-light)
    );
    pointer-events: none;
  }
}

.computer-content {
  position: relative;
  height: 100%;

  // Inner highlight
  &::before {
    --offset: -4px;
    --inner-light: rgb(86, 96, 71);

    content: "";
    position: absolute;
    top: var(--offset);
    right: var(--offset);
    bottom: var(--offset);
    left: var(--offset);
    border-radius: calc(var(--border-radius) / 2 + 2px);
    background: linear-gradient(
      var(--inner-light),
      rgb(40 40 40 / 1),
      var(--inner-light)
    );
    pointer-events: none;
  }
}

.shadow {
  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: -1;
  width: calc(100% + 90px);
  border-radius: 100%;
  background-color: rgb(0 0 0 / 0.8);
  filter: blur(8px);
  height: 20px;
  translate: -50% 80%;
}
</style>
