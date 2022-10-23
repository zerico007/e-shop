<script setup lang="ts">
import { RouterView } from "vue-router";

import Navbar from "./components/NavbarComponent.vue";
</script>

<template>
  <div class="app-container">
    <Navbar />
    <RouterView />
  </div>
</template>
