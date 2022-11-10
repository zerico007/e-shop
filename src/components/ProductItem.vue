<script lang="ts" setup>
import { ref } from "vue";
import Button from "./ButtonComponent.vue";
import Modal from "./ModalComponent.vue";
import EditProductForm from "./EditProductForm.vue";
import { useAddToCart } from "../api";
import { useUserStore } from "../store";
import { openModal, closeModal } from "../utils";

const VITE_API_URL = import.meta.env.VITE_API;

const userStore = useUserStore();

const props = defineProps<{
  product: Product;
}>();

const modalId = `edit-product-${props.product.id}`;

const quantity = ref(1);

const quantityOptions = Array.from(Array(10).keys()).map((i) => i + 1);

const { add, isAddingToCart } = useAddToCart(handleSuccess);

function scrollToTopOfPage() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function handleSuccess() {
  quantity.value = 1;
  scrollToTopOfPage();
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
      <EditProductForm :product="product" />
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
      <!-- <iframe
        width="560"
        height="315"
        :src="props.product.videoURL"
        frameborder="0"
        allowfullscreen
      ></iframe> -->
      <div class="select-container">
        <v-select
          v-model="quantity"
          :options="quantityOptions"
          placeholder="Qnty"
          :clearable="false"
        />
      </div>
      <Button theme="primary" :onClick="handleAddToCart">
        <div class="btn-body add-cart-btn">
          <span>{{ isAddingToCart ? "Adding..." : "Add to Cart" }}</span>
          <vue-feather
            :type="isAddingToCart ? 'loader' : 'shopping-cart'"
            size="20px"
          />
        </div>
      </Button>
      <Button
        style="margin-top: 1rem"
        v-if="userStore.user.role === 'administrator'"
        theme="primary"
        :onClick="() => openModal(modalId)"
      >
        <div class="btn-body edit-btn">
          <span>Edit</span>
          <vue-feather type="edit" size="20px" />
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
  height: 300px;
  transition: all 0.3s ease;

  &:hover {
    scale: 1.05;
    border: 3px solid var(--accent-color);
  }

  .product-img {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      max-width: 200px;
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

    p {
      margin: 0;
    }
  }

  .select-container {
    width: 200px;
    margin: 10px;
    width: 80px;
    border-radius: 0.25rem;
    background-color: var(--bg-dark-light);

    --vs-controls-color: #fff;
    --vs-selected-color: #fff;
    --vs-dropdown-option-color: #fff;
    --vs-dropdown-bg: var(--bg-dark-light);
    --vs-dropdown-option--active-bg: var(--primary-color);
    --vs-dropdown-min-width: 80px;
    --vs-border-color: none;
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
