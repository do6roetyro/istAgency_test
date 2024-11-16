<template lang="pug">
  main.main-container
    h1.visually-hidden Онлайн-магазин цветовых решений для ремонта поверхностей
    Hero.main-container__hero
    ProductCatalog.main-container__product-catalog.wrapper
  </template>

<script>
import { defineComponent } from "vue";
import Hero from "./Hero/Hero.vue";
import ProductCatalog from "./ProductCatalog/ProductCatalog.vue";

export default defineComponent({
  name: "MainContainer",
  components: {
    Hero,
    ProductCatalog,
  },
});
</script>

<style lang="scss" scoped>
.main-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-container__product-catalog {
  display: flex;
  padding-top: 72px;
  padding-bottom: 141px;
  position: relative;

  @media (max-width: 769px) {
    padding-top: 132px;
  }
}
</style>
