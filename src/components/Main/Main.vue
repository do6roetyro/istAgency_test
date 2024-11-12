<template lang="pug">
    main.main-container
      h1.visually-hidden Онлайн-магазин цветовых решений для ремонта поверхностей 
      Hero
      FilterSort
      ProductList
    </template>

<script>
import Hero from "./Hero/Hero.vue";
import FilterSort from "./Products/FilterSort.vue";
import ProductList from "./Products/ProductList.vue";
import { onMounted } from "vue";
import { useCatalogStore } from "@/store/store";

export default {
  components: {
    Hero,
    FilterSort,
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

<style scoped>
.main-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
