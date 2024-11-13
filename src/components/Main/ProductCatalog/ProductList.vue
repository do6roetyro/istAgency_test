<template lang="pug">
  .products
    p Количество найденных товаров: {{ products.length }}
    ul.products__list
      ProductCard(v-for="product in products" :key="product.id" :product="product")
</template>

<script>
import { useCatalogStore } from "@/store/catalogStore";
import ProductCard from "./ProductCard.vue";
import { computed } from "vue";

export default {
  components: { ProductCard },
  setup() {
    const catalogStore = useCatalogStore();
    const products = computed(() => catalogStore.filteredProducts);

    return { products };
  },
};
</script>

<style lang="scss" scoped>
.products {
  width: 100%;
}

.products__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(284px, 1fr));
  gap: 16px;
}

@media (max-width: 1024px) {
  .products__list {
    grid-template-columns: repeat(auto-fill, minmax(156px, 1fr));
  }
}
</style>