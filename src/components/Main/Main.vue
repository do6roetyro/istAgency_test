<template lang="pug">
  main.main-container
    h1.visually-hidden Онлайн-магазин цветовых решений для ремонта поверхностей
    Hero
    ProductFilter
    ProductSort
    ProductList
</template>

<script>
import Hero from "./Hero/Hero.vue";
import ProductFilter from "./Products/ProductFilter.vue";
import ProductSort from "./Products/ProductSort.vue";
import ProductList from "./Products/ProductList.vue";
import { onMounted } from "vue";
import { useCatalogStore } from "@/store/store";

export default {
  components: {
    Hero,
    ProductFilter,
    ProductSort,
    ProductList,
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
.main-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>