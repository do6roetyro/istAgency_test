<template lang="pug">
    section.product__sort
      select(@change="changeSortOption($event)")
        option(value="default") По умолчанию
        option(value="priceDesc") Сначала дорогие
        option(value="priceAsc") Сначала недорогие
        option(value="popular") Сначала популярные
        option(value="new") Сначала новые
  </template>
  
  <script>
  import { useCatalogStore } from '@/store/catalogStore';
  
  export default {
    setup() {
      const catalogStore = useCatalogStore();
  
      const changeSortOption = (event) => {
        catalogStore.updateSortOption(event.target.value);
      };
  
      return {
        changeSortOption,
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .product__sort {
    /* Стили для блока сортировки */
  }
  </style>