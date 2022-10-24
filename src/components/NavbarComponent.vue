<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store";
import Cart from "./CartComponent.vue";
import Button from "./ButtonComponent.vue";

const userStore = useUserStore();
const router = useRouter();

const isMenuOpen = ref(false);

const menuLinks = [
  {
    name: "Orders",
    link: "/e-shop/orders/",
  },
  {
    name: "Products",
    link: "/e-shop/products/",
  },
  {
    name: "Change Password",
    link: "/e-shop/change-password/",
  },
];

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

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

    <div v-if="userStore.user.isLoggedIn" class="authenticated-nav">
      <span>Welcome back, {{ userStore.user.username }}</span>
      <Cart />
      <Button theme="secondary" :onClick="toggleMenu">
        <vue-feather :type="isMenuOpen ? 'x' : 'menu'" size="20px" />
      </Button>
      <Button theme="secondary" :onClick="logout">
        <vue-feather type="log-out" size="20px" />
      </Button>
      <div
        :class="isMenuOpen ? 'menu-body open' : 'menu-body'"
        @click="toggleMenu"
      >
        <router-link v-for="link in menuLinks" :key="link.name" :to="link.link">
          <div class="menu-link">
            {{ link.name }}
          </div>
        </router-link>
      </div>
    </div>
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

  .authenticated-nav {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
    perspective: 1000px;
    z-index: 10;

    .menu-body {
      position: absolute;
      top: 40px;
      right: 60px;
      flex-direction: column;
      text-align: left;
      color: var(--bg-dark);
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
      width: 120px;
      padding: 0.5rem;
      min-height: 200px;
      opacity: 0;
      visibility: hidden;
      backface-visibility: hidden;
      transform: rotate3d(1, 0, 0, -90deg);
      transform-origin: 0% 0%;
      transition: all 0.3s;

      &.open {
        opacity: 1;
        visibility: visible;
        transform: rotate3d(0, 0, 0, 0);
      }

      .menu-link {
        margin: 1rem 0;
        width: 100%;
        border-radius: 0.2rem;
        padding: 0.3rem;
        transition: 0.3s all ease-in-out;
        color: var(--bg-dark-light);

        &:hover {
          cursor: pointer;
          background-color: var(--bg-dark-light);
          color: #fff;
        }
      }
    }
  }

  span {
    margin-right: 1rem;
  }

  a {
    margin-right: auto;
  }

  @media (max-width: 500px) {
    span {
      display: none;
    }
  }
}
</style>
