<script setup lang="ts">
export interface Props {
  text?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  theme?: "primary" | "secondary";
  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "button",
  theme: "primary",
  width: "fit-content",
  height: "40px",
  disabled: false,
});
</script>
<template>
  <button
    :class="theme"
    @click="props.onClick"
    :type="props.type"
    :disabled="props.disabled"
    :style="{ width: props.width, height: props.height }"
  >
    {{ props.text }}
    <slot />
  </button>
</template>

<style scoped lang="scss">
button {
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-transform: capitalize;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }
  &.primary {
    background-color: var(--accent-color);
    color: var(--bg-dark);
    &:hover {
      background-color: var(--accent-color-hover);
    }
  }
  &.secondary {
    background-color: var(--bg-dark);
    color: #fff;
    border: none;

    &:hover {
      background-color: var(--bg-dark-soft);
    }
  }
}
</style>
