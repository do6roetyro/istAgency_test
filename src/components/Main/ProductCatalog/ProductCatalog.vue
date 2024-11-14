<template lang="pug">
    section.product-catalog
      h2.visually-hidden Каталог продукции
      div.product-catalog__controls
        ProductFilter.product-catalog__filter
        ProductSort.product-catalog__sort
      ProductGrid.product-catalog__product-grid
  </template>
  
  <script>
  import ProductFilter from './ProductFilter.vue';
  import ProductSort from './ProductSort.vue';
  import ProductGrid from './ProductGrid.vue';
  import { onMounted } from 'vue';
  import { useCatalogStore } from '@/store/catalogStore';
  
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
    width: 100%
  }

  .product-catalog__product-grid {
    /* // */
  }
  
  .product-catalog__controls {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    /* Дополнительные стили для контролов */
  }
  
  /* Дополнительные стили при необходимости */
  </style>