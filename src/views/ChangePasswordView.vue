<script lang="ts" setup>
import { ref, computed } from "vue";
import Button from "../components/ButtonComponent.vue";
import { useUserStore } from "../store";
import { useUpdatePassword } from "../api";

const userStore = useUserStore();

const { isUpdatingPassword, updateUserPassword } = useUpdatePassword();

const newPassword = ref("");
const confirmPassword = ref("");
const currentPassword = ref("");

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const isPasswordDifferent = computed(
  () => newPassword.value !== currentPassword.value
);

const passwordsMatch = computed(() => {
  if (!newPassword.value || !confirmPassword.value) {
    return false;
  }
  return newPassword.value === confirmPassword.value;
});

const isStrongPassword = computed(() => passwordRegex.test(newPassword.value));

function handleChangePassword() {
  if (
    !passwordsMatch.value ||
    !isStrongPassword.value ||
    !isPasswordDifferent.value
  ) {
    return;
  }
  updateUserPassword({
    userId: userStore.user.userId,
    currentPassword: currentPassword.value,
    newPassword: newPassword.value,
  });
}
</script>
<template>
  <div class="form-container change-password">
    <h1>Change Password</h1>
    <form class="form password-change-form">
      <input
        type="password"
        v-model="currentPassword"
        placeholder="Current Password"
      />
      <input type="password" v-model="newPassword" placeholder="New Password" />
      <div
        class="password-criteria"
        :style="{ display: !!newPassword ? 'flex' : 'none' }"
      >
        <div class="criterion">
          <vue-feather
            :type="passwordRegex.test(newPassword) ? 'check' : 'x'"
            size="20px"
          />
          <span
            >Password must have at least 8 characters, 1 uppercase, 1 digit and
            1 special character</span
          >
        </div>
      </div>

      <input
        type="password"
        v-model="confirmPassword"
        placeholder="Confirm Password"
      />

      <Button
        width="fit-content"
        :disabled="!passwordsMatch || !isStrongPassword || !isPasswordDifferent"
        :onClick="handleChangePassword"
      >
        <div class="btn-body">
          <span>{{
            isUpdatingPassword ? "Changing..." : "Change Password"
          }}</span>
          <vue-feather
            :type="isUpdatingPassword ? 'loader' : 'lock'"
            size="20px"
          />
        </div>
      </Button>
    </form>
  </div>
</template>
<style scoped lang="scss">
.password-criteria {
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  width: 80%;
}
.criterion {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  span {
    font-size: 0.8rem;
  }
}
</style>
