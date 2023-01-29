<template>
  <input
    ref="nameInput"
    class="score-input"
    v-model="name"
    pattern="[A-Za-z]{3}"
    @keydown="onKeydown"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const emit = defineEmits(["onSubmit"]);

const nameInput = ref<HTMLInputElement>();
const name = ref("");

onMounted(() => {
  nameInput.value?.focus();
});

const onKeydown = (ev: KeyboardEvent): void => {
  if (ev.key === "Enter" && name.value) {
    emit("onSubmit", name?.value.toUpperCase());
  } else if (!/^([a-zA-Z])$/.test(ev.key) && ev.key !== "Backspace") {
    ev.preventDefault();
  }
};
</script>

<style scoped>
.score-input {
  border: 0px solid var(--snake-color);
  border-bottom-width: 3px;
  background: transparent;
  padding: 4px 8px;
  width: 100%;
  max-width: 200px;
  font-size: 1.5rem;
  caret-color: var(--snake-color);
  text-transform: uppercase;
  text-align: center;
}

.score-input:focus {
  outline: none;
}
</style>
