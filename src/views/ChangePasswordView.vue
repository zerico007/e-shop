<script lang="ts" setup>
import { ref, computed } from "vue";
import Button from "../components/ButtonComponent.vue";
import Password from "../components/PasswordComponent.vue";

import { useUserStore } from "../store";
import { useUpdatePassword } from "../api";

const userStore = useUserStore();

const { isUpdatingPassword, updateUserPassword } = useUpdatePassword();

const newPassword = ref("");
const confirmPassword = ref("");
const currentPassword = ref("");

const handleNewPasswordChange = (event: Event) => {
  newPassword.value = (event.target as HTMLInputElement).value;
};

const handleConfirmPasswordChange = (event: Event) => {
  confirmPassword.value = (event.target as HTMLInputElement).value;
};

const handleCurrentPasswordChange = (event: Event) => {
  currentPassword.value = (event.target as HTMLInputElement).value;
};

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
      <Password
        :value="currentPassword"
        placeholder="Current Password"
        :onChange="handleCurrentPasswordChange"
      />
      <Password
        :value="newPassword"
        placeholder="New Password"
        :onChange="handleNewPasswordChange"
      />
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
      <Password
        :value="confirmPassword"
        placeholder="Confirm Password"
        :onChange="handleConfirmPasswordChange"
      />
      <div
        class="criterion"
        :style="{ display: !!confirmPassword ? 'flex' : 'none' }"
      >
        <vue-feather :type="passwordsMatch ? 'check' : 'x'" size="20px" />
        <span>Passwords match</span>
      </div>
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
.change-password {
  background-image: url("../assets/my-password.svg");
  background-repeat: no-repeat;
  background-position: 10% 90%;
  background-size: 30%;
  min-height: 100vh;
  width: 100%;
  justify-content: flex-start;

  @media (max-width: 768px) {
    width: 80%;
    background-position: 50% 75%;
  }
  @media (max-width: 500px) {
    background-size: 50%;
  }
  @media (max-height: 700px) {
    background-size: 35%;
    background-position: 50% 95%;
  }
  @media (max-height: 500px) {
    background-position: 5% 60%;
    background-size: 20%;
  }
}
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
