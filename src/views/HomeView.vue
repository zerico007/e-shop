<script lang="ts" setup>
import { ref } from "vue";
import { useProducts } from "../api";

const VITE_API_URL = import.meta.env.VITE_API;

const searchTerm = ref("");

const { data, isLoading } = useProducts();

function filterProductsBySearchTerm() {
  return data.value.filter((product: any) => {
    return product.name.toLowerCase().includes(searchTerm.value.toLowerCase());
  });
}
</script>
<template>
  <div class="home-container">
    <div class="search">
      <input type="text" v-model="searchTerm" placeholder="Search" />
      <vue-feather type="search" size="20px" />
    </div>
    <h3 v-if="isLoading">Loading...</h3>
    <div v-else class="products">
      <div
        v-for="product in filterProductsBySearchTerm()"
        :key="product.id"
        class="product"
      >
        <div class="product-img">
          <img
            :src="`${VITE_API_URL}/${product.productImage}`"
            :alt="product.name"
          />
        </div>
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p>{{ `$${product.price}.00` }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;

  .search {
    margin-top: 6rem;
    display: flex;
    width: 40%;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    align-items: center;
    background-color: var(--bg-dark-soft);
    border-radius: 0.5rem;

    &:focus-within {
      outline: 4px auto -webkit-focus-ring-color;
    }

    input {
      background-color: transparent;
      width: 100%;

      &:focus,
      :focus-visible {
        outline: none;
      }
    }
  }

  .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 6rem;
    .product {
      width: 40%;
      background-color: #fff;
      color: var(--bg-dark);
      border-radius: 5px;
      padding: 1rem;
      display: flex;
      height: 275px;

      .product-img {
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          object-fit: cover;
        }
      }
      .product-info {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: auto;
      }
    }
  }

  @media (max-width: 768px) {
    .products {
      .product {
        width: 80%;
      }
    }

    .search {
      width: 80%;
    }
  }

  @media (max-width: 500px) {
    .products {
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
  }
}
</style>
