<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../store";
import Cart from "./CartComponent.vue";
import Button from "./ButtonComponent.vue";

const userStore = useUserStore();
const router = useRouter();

function logout() {
  userStore.logout();
  router.push("/e-shop/");
}
</script>
<template>
  <div class="nav-bar">
    <router-link :to="userStore.user.isLoggedIn ? '/e-shop/home/' : '/e-shop/'">
      <h2>E-Shop</h2>
    </router-link>

    <span v-if="userStore.user.isLoggedIn"
      >Welcome back, {{ userStore.user.username }}</span
    >
    <Cart v-if="userStore.user.isLoggedIn" />
    <Button
      v-if="userStore.user.isLoggedIn"
      theme="secondary"
      :onClick="logout"
    >
      <vue-feather type="log-out" size="20px" />
    </Button>
  </div>
</template>
<style lang="scss" scoped>
.nav-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 2rem;
  background-color: transparent;

  span {
    margin-right: 1rem;
  }

  a {
    margin-right: auto;
  }
}
</style>
