import { onMounted, onUnmounted, ref } from "vue";
import type { Direction } from "../types";

export const useArrowKeyListener = () => {
  const direction = ref<Direction>("right");

  const onKeydown = (ev: KeyboardEvent): void => {
    if (ev.key === "ArrowRight" && direction.value !== "left") {
      direction.value = "right";
    } else if (ev.key === "ArrowDown" && direction.value !== "up") {
      direction.value = "down";
    } else if (ev.key === "ArrowLeft" && direction.value !== "right") {
      direction.value = "left";
    } else if (ev.key === "ArrowUp" && direction.value !== "down") {
      direction.value = "up";
    }
  };

  onMounted(() => {
    document.addEventListener("keydown", onKeydown);
  });

  onUnmounted(() => {
    document.removeEventListener("keydown", onKeydown);
  });

  return direction;
};
