<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import Button from "../components/ButtonComponent.vue";
import Password from "../components/PasswordComponent.vue";
import { useRegister } from "../api";
import { toaster } from "../utils";

const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const handlePasswordChange = (event: Event) => {
  password.value = (event.target as HTMLInputElement).value;
};

const handleConfimPasswordChange = (event: Event) => {
  confirmPassword.value = (event.target as HTMLInputElement).value;
};

const passwordsMatch = computed(() => {
  if (!password.value || !confirmPassword.value) {
    return false;
  }
  return password.value === confirmPassword.value;
});

const characterCountRegex = /.{8,}/;
const uppercaseRegex = /(?=.*?[A-Z])/;
const specialCharacterRegex = /(?=.*?[#?!@$%^&*-])/;
const digitRegex = /(?=.*?[0-9])/;

const passwordValid = computed(() => {
  if (!password.value) {
    return false;
  }
  return (
    characterCountRegex.test(password.value) &&
    uppercaseRegex.test(password.value) &&
    specialCharacterRegex.test(password.value) &&
    digitRegex.test(password.value)
  );
});

const onRegisterSuccess = () => {
  toaster.success("Registration successful");
  router.push("/e-shop/");
};

const { isLoading, registerUser } = useRegister(onRegisterSuccess);
</script>
<template>
  <div class="form-container register">
    <h1>Register</h1>
    <form @submit.prevent="" class="register-form form">
      <input type="text" v-model="username" placeholder="Username" />
      <input type="email" v-model="email" placeholder="Email" />
      <Password
        :value="password"
        placeholder="Password"
        :onChange="handlePasswordChange"
      />
      <div
        class="password-criteria"
        :style="{ display: !!password ? 'flex' : 'none' }"
      >
        <div class="criterion">
          <vue-feather
            :type="characterCountRegex.test(password) ? 'check' : 'x'"
            size="20px"
          />
          <span>At least 8 characters</span>
        </div>
        <div class="criterion">
          <vue-feather
            :type="uppercaseRegex.test(password) ? 'check' : 'x'"
            size="20px"
          />
          <span>At least 1 uppercase letter</span>
        </div>
        <div class="criterion">
          <vue-feather
            :type="specialCharacterRegex.test(password) ? 'check' : 'x'"
            size="20px"
          />
          <span>At least 1 special character</span>
        </div>
        <div class="criterion">
          <vue-feather
            :type="digitRegex.test(password) ? 'check' : 'x'"
            size="20px"
          />
          <span>At least 1 digit</span>
        </div>
      </div>
      <Password
        :value="confirmPassword"
        placeholder="Confirm Password"
        :onChange="handleConfimPasswordChange"
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
        type="submit"
        :disabled="!passwordsMatch || !passwordValid || !username || !email"
        :onClick="() => registerUser({ username, email, password })"
      >
        <div class="register-btn-div btn-body">
          <span>Register</span>
          <vue-feather :type="isLoading ? 'loader' : 'user-plus'" size="20px" />
        </div>
      </Button>
    </form>
    <router-link to="/e-shop/">Already have an account? Login</router-link>
  </div>
</template>
<style scoped lang="scss">
.register {
  background-image: url("../assets/account-access.svg");
  background-repeat: no-repeat;
  background-position: 10% 90%;
  background-size: 30%;
  min-height: 100vh;
  width: 100%;
  justify-content: flex-start;

  @media (max-width: 768px) {
    width: 80%;
    background-position: bottom;
  }
  @media (max-width: 500px) {
    background-size: 50%;
    background-position: 50% 80%;
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
}
.criterion {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  span {
    font-size: 0.8rem;
  }
}
</style>
