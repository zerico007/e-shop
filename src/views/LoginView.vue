<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

import Button from "../components/ButtonComponent.vue";
import { useLogin, setBearerToken } from "../api";
import { useUserStore } from "../store";

const email = ref("");
const password = ref("");

const userStore = useUserStore();
const router = useRouter();

const { isError, isLoading, isSuccess, loginUser } = useLogin((data: any) => {
  userStore.setUser(data.token);
  setBearerToken(data.token);
});

watch(isSuccess, (success) => {
  if (success) {
    // redirect to home page
    console.log("login successful");
    router.push("home");
    // clear form
    email.value = "";
    password.value = "";
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
      <div class="error">
        <span v-if="isError">Login Error</span>
      </div>
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

  .error {
    color: red;
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
