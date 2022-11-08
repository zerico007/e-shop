<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

import Button from "../components/ButtonComponent.vue";
import Password from "../components/PasswordComponent.vue";
import { useLogin, setBearerToken } from "../api";
import { useUserStore } from "../store";
import { toaster } from "../utils";

const email = ref("");
const password = ref("");

const userStore = useUserStore();
const router = useRouter();

const handlePasswordChange = (event: Event) => {
  password.value = (event.target as HTMLInputElement).value;
};

const { isLoading, isSuccess, loginUser } = useLogin((data: any) => {
  userStore.setUser(data.token);
  setBearerToken(data.token);
});

watch(isSuccess, (success) => {
  if (success) {
    // redirect to home page
    console.log("login successful");
    toaster.success("Login successful");
    router.push("home");
    // clear form
    email.value = "";
    password.value = "";
  }
});

onMounted(() => {
  // check if user is already logged in
  if (userStore.user.isLoggedIn) {
    router.push("home");
  }
});
</script>
<template>
  <div class="form-container login">
    <h1>Welcome to E-Shop</h1>
    <form
      @submit.prevent="() => loginUser({ email, password })"
      class="login-form form"
    >
      <input type="email" v-model="email" placeholder="Email" />
      <Password
        :value="password"
        placeholder="Password"
        :onChange="handlePasswordChange"
      />
      <Button type="submit" :disabled="!email && !password">
        <div class="login-btn-div btn-body">
          <span>{{ isLoading ? "Logging in..." : "Login" }}</span>
          <vue-feather :type="isLoading ? 'loader' : 'log-in'" size="20px" />
        </div>
      </Button>
    </form>
    <router-link to="/e-shop/register/">
      New here? Create an account with us.
    </router-link>
  </div>
</template>
<style lang="scss" scope>
.login {
  background-image: url("../assets/login.svg");
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: 50%;
  background-attachment: fixed;
  min-height: 100vh;
  width: 100%;
  justify-content: flex-start;

  @media (max-width: 768px) {
    width: 80%;
    background-position: 50% 75%;
    background-image: url("../assets/mobile-login.svg");
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
</style>
