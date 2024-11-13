<template lang="pug">
    section.sort
      select.sort__list(@change="changeSortOption($event)")
        option.sort__item(value="default") По умолчанию
        option.sort__item(value="priceDesc") Сначала дорогие
        option.sort__item(value="priceAsc") Сначала недорогие
        option.sort__item(value="popular") Сначала популярные
        option.sort__item(value="new") Сначала новые
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