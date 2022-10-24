<script lang="ts" setup>
import landingPageHero from "@/assets/landing-page.jpeg";
import Button from "../components/ButtonComponent.vue";
</script>
<template>
  <div class="home-container">
    <div class="hero">
      <img :src="landingPageHero" alt="hero" />
      <div class="hero-text">
        <h1 class="big-e">E</h1>
        <h1>Shop</h1>
        <p>Where the best come to shop apple products.</p>
        <router-link to="/e-shop/products/">
          <Button text="shop now" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100vh;

  .hero {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 4rem auto;
    position: relative;
    background: rgba(0, 0, 0, 0.7);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }

    .hero-text {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 2rem auto;
      position: relative;
      z-index: 1;

      h1 {
        font-size: 10rem;
        font-weight: 700;
        margin: 0;
      }

      .big-e {
        transform: rotate(-35deg);
      }

      p {
        font-size: 1.5rem;
        font-weight: 400;
        color: var(--text-light);
        text-align: center;
        margin-bottom: 1rem;
      }

      @media (max-width: 500px) {
        h1 {
          font-size: 7rem;
        }
      }
    }
  }
}
</style>
