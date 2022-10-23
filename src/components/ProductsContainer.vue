<script lang="ts" setup>
import Product from "./ProductItem.vue";

const props = defineProps<{
  products: Product[] | undefined;
}>();
</script>
<template>
  <div v-if="!!products" class="products">
    <Product
      v-for="product in props.products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<style scoped lang="scss">
.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 6rem;
}
</style>
