<script lang="ts" setup>
import { ref } from "vue";
import { openModal, closeModal } from "../utils";
import Modal from "./ModalComponent.vue";
import Button from "./ButtonComponent.vue";
import { useAddToCart } from "../api";

const VITE_API_URL = import.meta.env.VITE_API;

const props = defineProps<{
  product: Product;
}>();

const quantity = ref(1);

const { add, isAddingToCart } = useAddToCart(handleSuccess);

const modalId = `add-to-cart-modal-${props.product.id}`;

function handleSuccess() {
  closeModal(modalId);
  quantity.value = 1;
}

function handleAddToCart() {
  add({
    productId: props.product.id,
    quantity: quantity.value,
  });
}
</script>
<template>
  <div class="product">
    <Modal :id="modalId">
      <span>How many do you want to add?</span>
      <span>{{ props.product.name }}</span>
      <input type="number" v-model="quantity" />
      <Button :onClick="handleAddToCart">
        <div class="btn-body">
          <span>{{ isAddingToCart ? "Adding..." : "Confirm" }}</span>
          <vue-feather
            :type="isAddingToCart ? 'loader' : 'check'"
            size="20px"
          />
        </div>
      </Button>
    </Modal>
    <div class="product-img">
      <img
        :src="`${VITE_API_URL}/${props.product.productImage}`"
        :alt="props.product.name"
      />
    </div>
    <div class="product-info">
      <h3>{{ props.product.name }}</h3>
      <p>{{ `$${props.product.price}.00` }}</p>
      <Button theme="primary" :onClick="() => openModal(modalId)">
        <div class="btn-body add-cart-btn">
          <span>Add to Cart</span>
          <vue-feather type="shopping-cart" size="20px" />
        </div>
      </Button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
input[type="number"] {
  width: 80px;
  border-radius: 0.2rem;
  height: 2rem;
  margin: 1rem 0;
}
.product {
  width: 40%;
  background-color: #fff;
  color: var(--bg-dark);
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  height: 275px;

  .product-img {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      max-width: 250px;
      object-fit: cover;

      &:hover {
        transform: scale(1.1);
        transition: all 0.3s ease-in-out;
      }
    }
  }
  .product-info {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: auto;
  }
}

@media (max-width: 768px) {
  .product {
    width: 80%;
  }
}

@media (max-width: 500px) {
  .product {
    flex-direction: column;
    height: auto;
    .product-img {
      width: 100%;
    }
    .product-info {
      width: 100%;
      margin-left: 0;
    }
  }
}
</style>
