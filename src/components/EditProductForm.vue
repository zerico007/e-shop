<script lang="ts" setup>
import { ref } from "vue";
import { useUpdateProduct } from "../api";
import { closeModal } from "../utils";
import Button from "./ButtonComponent.vue";

const props = defineProps<{
  product: Product;
}>();

const name = ref(props.product.name);
const price = ref(props.product.price);
const videoURL = ref(props.product.videoURL);

const { update, isUpdating } = useUpdateProduct();

function handleUpdate() {
  const productData = new FormData();
  productData.append("name", name.value);
  productData.append("price", price.value.toString());
  productData.append("videoURL", videoURL.value);

  update({
    id: props.product.id,
    productData,
  });
  closeModal(`edit-product-${props.product.id}`);
}
</script>
<template>
  <div class="form-container edit-product">
    <h2>Edit Product</h2>
    <form class="form edit-product-form">
      <input type="text" v-model="name" />
      <input type="text" v-model="price" />
      <input type="text" v-model="videoURL" />
      <Button
        :text="isUpdating ? 'Updating...' : 'Update'"
        :disabled="isUpdating"
        :onClick="handleUpdate"
      />
    </form>
  </div>
</template>
