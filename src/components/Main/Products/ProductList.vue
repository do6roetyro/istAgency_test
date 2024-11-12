<template lang="pug">
  section.products
    p Количество найденных товаров: {{ products.length }}
    ul.products__list
      ProductCard(v-for="product in products" :key="product.id" :product="product")
</template>

<script>
import { useCatalogStore } from "@/store/store";
import ProductCard from "./ProductCard.vue";
import { computed } from "vue";

export default {
  components: { ProductCard },
  setup() {
    const catalogStore = useCatalogStore();
    const products = computed(() => catalogStore.filteredProducts); // используем computed для обновлений

    return { products };
  },
};
</script>

<style scoped>
.products {
  width: 100%;
}

.products__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(284px, 1fr));
  gap: 16px; /* Расстояние между элементами */
  justify-content: center; /* Для центрирования всей сетки */
}

@media (max-width: 1024px) {
  .products__list {
    grid-template-columns: repeat(auto-fill, minmax(156px, 1fr));
   
  }
}
</style>
