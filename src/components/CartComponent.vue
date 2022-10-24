<script lang="ts" setup>
import { ref, computed } from "vue";
import Button from "./ButtonComponent.vue";
import { useCart, usePlaceOrder, useDeleteFromCart } from "../api";

const VITE_API_URL = import.meta.env.VITE_API;

const isCartOpen = ref(false);

const { cart, isLoading } = useCart();
const { place, isPlacingOrder } = usePlaceOrder(() => toggleCartOpen());
const { remove, isRemovingFromCart } = useDeleteFromCart();

const isCartEmpty = computed(() => !!cart.value?.message);

const cartCount = computed(() => {
  if (isCartEmpty.value) {
    return 0;
  }
  return cart.value?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;
});

function toggleCartOpen() {
  isCartOpen.value = !isCartOpen.value;
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
    <div class="cart-body" :class="isCartOpen ? 'open' : ''">
      <div v-if="isCartEmpty" class="cart-empty">
        <span>Your cart is empty!</span>
        <span>Fill it with awesome things you love!</span>
      </div>
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

          <div class="remove">
            <vue-feather
              @click="() => remove(item.product._id)"
              :type="isRemovingFromCart ? 'loader' : 'trash'"
              size="15px"
            />
          </div>
        </div>
      </div>
      <h3 v-if="!isCartEmpty">Total: {{ cart?.Total }}</h3>
      <Button v-if="!isCartEmpty" :onClick="place">
        <div class="btn-body">
          <span>{{ isPlacingOrder ? "Checking Out..." : "Check Out" }}</span>
          <vue-feather
            :type="isPlacingOrder ? 'loader' : 'arrow-right'"
            size="20px"
          />
        </div>
      </Button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cart-container {
  position: relative;

  .cart-body {
    position: absolute;
    display: flex;
    top: 40px;
    right: 0;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    color: var(--bg-dark);
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
    width: 400px;
    min-height: 400px;
    opacity: 0;
    transform: translate(-2.5rem, -2.5rem) scale(0);
    transform-origin: 100% 0%;
    transition: all 0.3s ease-in-out;
    z-index: 10;

    &.open {
      opacity: 1;
      transform: translate(0) scale(1);
    }

    h3 {
      margin-top: auto;
    }

    .cart-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin: auto 0;
      font-weight: bold;
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

        .remove {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-dark-light);
          color: #fff;
          border-radius: 0.2rem;
          padding: 0.3rem;
        }

        .cart-item-image {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
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
    animation: swell 1s ease-in-out;

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
