<script lang="ts" setup>
import { ref, computed } from "vue";
import Button from "./ButtonComponent.vue";
import { useCart } from "../api";

const VITE_API_URL = import.meta.env.VITE_API;

const isCartOpen = ref(false);

const { cart, isLoading } = useCart();

const cartCount = computed(
  () => cart.value?.items.reduce((acc, item) => acc + item.quantity, 0) || 0
);

function toggleCartOpen() {
  if (isCartOpen.value) {
    const cartBody = document.querySelector(".cart-body") as HTMLElement;
    cartBody?.classList.add("closed");
    setTimeout(() => {
      isCartOpen.value = false;
      cartBody?.classList.remove("closed");
    }, 400);
    return;
  }
  isCartOpen.value = true;
}
</script>
<template>
  <div class="cart-container">
    <div class="cart-icon-btn">
      <Button :onClick="toggleCartOpen" theme="secondary">
        <vue-feather type="shopping-cart" size="20px" />
      </Button>
    </div>
    <div class="cart-badge">
      <span>{{ cartCount }}</span>
    </div>
    <div class="cart-body" :style="{ display: isCartOpen ? 'flex' : 'none' }">
      <div class="cart-items">
        <div class="cart-item" v-for="item in cart?.items" :key="item.id">
          <div class="cart-item-image">
            <img
              :src="`${VITE_API_URL}/${item.product.productImage}`"
              alt="item"
            />
          </div>
          <div class="cart-item-details">
            <div class="cart-item-name">{{ item.product.name }}</div>
            <div class="cart-item-quantity">x {{ item.quantity }}</div>
          </div>
          <div class="cart-item-price">
            {{
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(item.product.price * item.quantity)
            }}
          </div>
        </div>
      </div>
      <h3>Total: {{ cart?.Total }}</h3>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cart-container {
  position: relative;

  .cart-body {
    position: absolute;
    top: 40px;
    right: 0;
    flex-direction: column;
    padding: 1rem;
    color: var(--bg-dark);
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
    width: 400px;
    height: 400px;
    animation: enterTopRight 0.4s ease-in-out;
    transform-origin: 100% 0%;

    &.closed {
      animation: exitTopRight 0.4s ease-in-out;
    }

    h3 {
      margin-top: auto;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;

      .cart-item {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
        border-bottom: 1px solid var(--bg-dark);

        .cart-item-image {
          width: 50px;
          height: 50px;
          img {
            width: 100%;
            object-fit: cover;
          }
        }

        .cart-item-details {
          display: flex;
          gap: 0.5rem;
          width: 100%;
        }
      }
    }
  }

  .cart-badge {
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--accent-color);
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;

    span {
      color: var(--bg-dark);
      font-weight: bold;
    }
  }

  @media (max-width: 510px) {
    .cart-body {
      right: -40px;
      width: 300px;
    }
  }
}
</style>
