<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps<{
  value: string;
  placeholder: string;
  onChange: (event: Event) => void;
}>();

const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>
<template>
  <div class="password-input-box">
    <vue-feather
      v-if="!!props.value"
      :type="isPasswordVisible ? 'eye-off' : 'eye'"
      size="20px"
      @click="togglePasswordVisibility"
    />
    <input
      :type="isPasswordVisible ? 'text' : 'password'"
      :value="props.value"
      :placeholder="props.placeholder"
      @input="props.onChange"
    />
  </div>
</template>
