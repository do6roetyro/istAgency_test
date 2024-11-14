<template lang="pug">
    section.product-catalog
      h2.visually-hidden Каталог продукции
      h3.product-catalog__title Краски
      div.product-catalog__controls
        ProductFilter.product-catalog__filter
        ProductSort.product-catalog__sort
      ProductGrid.product-catalog__product-grid
  </template>

<script>
import ProductFilter from "./ProductFilter.vue";
import ProductSort from "./ProductSort.vue";
import ProductGrid from "./ProductGrid.vue";
import { onMounted } from "vue";
import { useCatalogStore } from "@/store/catalogStore";

export default {
  components: {
    ProductFilter,
    ProductSort,
    ProductGrid,
  },
  setup() {
    const catalogStore = useCatalogStore();

    onMounted(() => {
      catalogStore.fetchProducts();
    });
  },
};
</script>

<style lang="scss" scoped>
.product-catalog {
  width: 100%;
}

.product-catalog__controls {
  display: flex;
  flex-direction: column;
}

.product-catalog__sort {
  position: absolute;
  right: 3.33vw;
  top: 54px;
}

.product-catalog__filter {
  margin-right: 138px;
  width: 165px;
}

.product-catalog__title {
  display: none;
  position: absolute;
  font-size: 36px;
  line-height: 31.68px;
  letter-spacing: -0.04em;
  top: -42px;

  @media (max-width: 769px) {
    display: block;
  }
}
</style>
