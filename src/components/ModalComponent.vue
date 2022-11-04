<script lang="ts" setup>
import Button from "./ButtonComponent.vue";

const props = defineProps<{
  id: string;
}>();

function closeModal() {
  const modal = document.getElementById(props.id) as HTMLDialogElement;
  modal?.close();
}
</script>
<template>
  <dialog class="modal-container" :id="props.id">
    <Button :onClick="closeModal" theme="secondary" class="close-icon">
      <vue-feather type="x" size="20px" />
    </Button>
    <div class="modal-content">
      <slot />
    </div>
  </dialog>
</template>
<style lang="scss" scoped>
dialog {
  position: relative;
  width: 400px;
  min-height: 300px;
  border-radius: 8px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  color: var(--bg-dark);

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
    padding: 1rem;
    width: 100%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .close-icon {
    position: absolute;
    top: 0;
    right: 0;
    color: var(--bg-dark);
    background-color: transparent;
  }
}
</style>
