<script lang="ts" setup>
import { ref } from "vue";
import { useProducts } from "../api";
import ProductsContainer from "../components/ProductsContainer.vue";

const searchTerm = ref("");

const { data, isLoading } = useProducts();

function filterProductsBySearchTerm() {
  return data.value?.filter((product: any) => {
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
    <h3 v-if="isLoading">
      <vue-feather type="loader" />
    </h3>
    <ProductsContainer v-else :products="filterProductsBySearchTerm()" />
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

  @media (max-width: 768px) {
    .search {
      width: 80%;
    }
  }
}
</style>
