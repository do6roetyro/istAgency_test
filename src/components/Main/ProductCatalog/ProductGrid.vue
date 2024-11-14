<template lang="pug">
  .product-grid
    p.product-grid__count {{ products.length }} товаров
    ul.product-grid__list
      ProductCard.product-grid__item(v-for="product in products" :key="product.id" :product="product")
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
.product-grid {
  width: 100%;
}

.product-grid__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(278px, 1fr));
  gap: 16px;
  @media (max-width: 940px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  @media (max-width: 769px) {
    grid-template-columns: repeat(auto-fill, minmax(156px, 1fr));
  }
}

.product-grid__count {
  font-size: 12px;
  font-weight: 500;
  line-height: 14.52px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin: 0;
  padding-bottom: 44px;
}
</style>
