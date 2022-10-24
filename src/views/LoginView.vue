<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

import Button from "../components/ButtonComponent.vue";
import { useLogin, setBearerToken } from "../api";
import { useUserStore } from "../store";
import { toaster } from "../utils";

const email = ref("");
const password = ref("");

const userStore = useUserStore();
const router = useRouter();

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
  <div class="login-container">
    <h1>Welcome to E-Shop</h1>
    <form
      @submit.prevent="() => loginUser({ email, password })"
      class="login-form"
    >
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <Button width="fit-content" type="submit" :disabled="!email && !password">
        <div class="login-btn-div btn-body">
          <span>{{ isLoading ? "Loading..." : "Login" }}</span>
          <vue-feather :type="isLoading ? 'loader' : 'log-in'" size="20px" />
        </div>
      </Button>
    </form>
  </div>
</template>
<style lang="scss" scoped>
.login-container {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 50%;
  }

  @media (max-width: 500px) {
    .login-form {
      width: 100%;

      input,
      button {
        width: 100% !important;
      }
    }
  }
}
</style>