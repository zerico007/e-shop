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
    name: "Home",
    link: "/e-shop/home/",
    icon: "home",
  },
  {
    name: "Orders",
    link: "/e-shop/orders/",
    icon: "shopping-bag",
  },
  {
    name: "Products",
    link: "/e-shop/products/",
    icon: "smartphone",
  },
  {
    name: "Change Password",
    link: "/e-shop/change-password/",
    icon: "lock",
  },
];

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function onClickAway() {
  if (!isMenuOpen.value) return;
  isMenuOpen.value = false;
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

    <div
      v-if="userStore.user.isLoggedIn"
      class="authenticated-nav"
      :class="isMenuOpen ? 'hidden' : ''"
    >
      <div class="icons" :class="isMenuOpen ? 'hidden' : ''">
        <Cart />
        <Button theme="secondary" :onClick="toggleMenu">
          <vue-feather type="menu" size="20px" />
        </Button>
      </div>

      <div
        :class="isMenuOpen ? 'menu-body open' : 'menu-body'"
        @click="toggleMenu"
        v-click-away="isMenuOpen && onClickAway"
      >
        <vue-feather class="close-menu" type="x" size="30px" />
        <span>Welcome back, {{ userStore.user.username }}</span>
        <router-link v-for="link in menuLinks" :key="link.name" :to="link.link">
          <div class="menu-link">
            <vue-feather :type="link.icon" size="20px" />
            <span>{{ link.name }}</span>
          </div>
        </router-link>
        <Button theme="secondary" :onClick="logout">
          <div class="btn-body">
            <span>Logout</span>
            <vue-feather type="log-out" size="20px" />
          </div>
        </Button>
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
    z-index: 10;

    .icons {
      display: flex;
      align-items: center;
      transition: all 0.3s ease-in-out;
      width: 100px;

      &.hidden {
        width: 0;
        overflow: hidden;
      }
    }

    .menu-body {
      position: absolute;
      top: -10px;
      right: 20px;
      flex-direction: column;
      text-align: center;
      align-items: center;
      color: #fff;
      background-color: var(--bg-dark);
      border-radius: 8px;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
      height: 100vh;
      padding: 0.5rem;
      padding-top: 4rem;
      opacity: 0;
      visibility: hidden;
      width: 0;
      transition: all 0.3s ease-in-out;
      display: flex;

      a {
        margin: 0;
      }

      &.open {
        opacity: 1;
        visibility: visible;
        width: 300px;
        right: -32px;
      }

      .close-menu {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
      }

      .secondary {
        &:hover {
          background-color: #fff;
          color: var(--bg-dark);
        }
      }

      .menu-link {
        margin: 1rem 0;
        width: 100%;
        border-radius: 0.2rem;
        padding: 0.3rem;
        transition: 0.3s all ease-in-out;
        color: #fff;
        display: flex;
        justify-content: center;

        span {
          margin-left: 10px;
        }

        &:hover {
          cursor: pointer;
          background-color: #fff;
          color: var(--bg-dark);
        }
      }
    }
  }

  a {
    margin-right: auto;
  }

  @media (max-width: 500px) {
    .authenticated-nav {
      .menu-body {
        &.open {
          width: 100vw;
        }

        .menu-link,
        .secondary,
        span {
          font-size: larger;
        }
      }
    }
  }
}
</style>
