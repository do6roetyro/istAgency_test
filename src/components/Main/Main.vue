<template lang="pug">
  main.main-container
    h1.visually-hidden Онлайн-магазин цветовых решений для ремонта поверхностей
    Hero
    ProductCatalog
</template>

<script>
import Hero from "./Hero/Hero.vue";
import ProductCatalog from "./ProductCatalog/ProductCatalog.vue";

export default {
  components: {
    Hero,
    ProductCatalog,
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>