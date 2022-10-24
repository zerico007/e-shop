<script lang="ts" setup>
import { useUserStore } from "../store";
import { useAddToCart } from "../api";
import Button from "./ButtonComponent.vue";

const VITE_API_URL = import.meta.env.VITE_API;

const props = defineProps<{
  order: Order;
}>();

const userStore = useUserStore();
const { add, isAddingToCart } = useAddToCart();

function handleAddToCart(id: string) {
  add({
    productId: id,
    quantity: 1,
  });
}
</script>
<template>
  <div class="order-container">
    <div class="headers">
      <div v-if="userStore.user.role === 'administrator'" class="header user">
        <h4>User</h4>
        <p>{{ props.order.user }}</p>
      </div>
      <div class="header order-id">
        <h4>Order ID</h4>
        <p>{{ props.order.id }}</p>
      </div>
      <div class="header date">
        <h4>Order Date</h4>
        <p>{{ props.order.dateCreated }}</p>
      </div>
      <div class="header total">
        <h4>Order Total</h4>
        <p>{{ props.order.OrderTotal }}</p>
      </div>
    </div>
    <div class="order-info">
      <div
        class="order-item"
        v-for="item in props.order.items"
        :key="item.productId"
      >
        <div class="order-image">
          <img
            :src="`${VITE_API_URL}/${item.productImage}`"
            :alt="item.product"
          />
        </div>
        <div class="order-details">
          <h4>{{ item.product }}</h4>
          <p>{{ `$${item.unitPrice}.00 x ${item.quantity}` }}</p>
          <p>
            {{
              `Subtotal: ${new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(item.total)}`
            }}
          </p>
        </div>
        <Button
          theme="primary"
          :onClick="() => handleAddToCart(item.productId)"
        >
          <div class="btn-body add-cart-btn">
            <span>{{ isAddingToCart ? "Adding..." : "Buy Again" }}</span>
            <vue-feather
              :type="isAddingToCart ? 'loader' : 'shopping-cart'"
              size="20px"
            />
          </div>
        </Button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.order-container {
  display: flex;
  flex-direction: column;
  width: 80%;
  border: 3px solid var(--bg-dark-light);
  border-radius: 0.5rem;
  background-color: #fff;
  color: var(--bg-dark-light);

  .headers {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 2rem;
    border-bottom: 3px solid var(--bg-dark-light);

    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 20%;

      h4 {
        font-size: 1.2rem;
        font-weight: 500;
        margin-bottom: 0;
      }

      p {
        font-weight: 300;
        font-size: 0.8rem;
      }
    }
  }

  .order-info {
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .order-item:not(:first-of-type) {
      border-top: 1px solid var(--bg-dark-light);
    }

    .order-item {
      display: flex;
      width: 90%;
      padding: 0.5rem 2rem;
      margin: 0.5rem 0;
      gap: 1rem;
      .order-image {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 100%;
          object-fit: cover;
        }
      }

      .order-details {
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding-left: 1rem;
      }

      .primary {
        width: 200px !important;
        margin: auto 0;
      }
    }
  }

  @media (max-width: 768px) {
    .headers {
      flex-direction: column;
      align-items: flex-start;

      .header {
        width: 100%;
      }

      .user,
      .order-id {
        display: none;
      }
    }
    .order-info {
      .order-item {
        flex-direction: column;
        align-items: center;

        .order-image {
          width: 50%;
        }
        .order-details {
          width: 100%;
          align-items: center;
        }
      }
    }
  }
}
</style>
