<script lang="ts" setup>
import { useGetOrders } from "../api";
import { useUserStore } from "../store";
import Order from "../components/OrderComponent.vue";

const userStore = useUserStore();

const { orders, isGettingOrders } = useGetOrders(userStore.user.role);
</script>
<template>
  <div class="orders-container">
    <h2>Orders</h2>
    <div v-if="isGettingOrders">
      <vue-feather type="loader" />
    </div>
    <div v-else class="orders">
      <Order v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.orders-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5rem auto;

  .orders {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}
</style>
