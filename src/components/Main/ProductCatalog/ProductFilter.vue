<template lang="pug">
  .filter
    .filter__list
      label.filter__label(v-for="(label, filter) in filterLabels" :key="filter")
        ToggleSwitch(
          :modelValue="filters[filter]"
          @update:modelValue="value => toggleFilter(filter, value)"
        )
        span {{ label }}
  </template>
  
  <script>
  import { useCatalogStore } from '@/store/catalogStore';
  import { debounce } from '@/utilites/debounce';
  import ToggleSwitch from '@/components/UIKit/ToggleSwitch.vue';
  
  export default {
    components: {
      ToggleSwitch,
    },
    setup() {
      const catalogStore = useCatalogStore();
      const filters = catalogStore.filters;
      const filterLabels = {
        isNew: 'Новинки',
        inStock: 'Есть в наличии',
        isContract: 'Контрактные',
        isExclusive: 'Эксклюзивные',
        onSale: 'Распродажа',
      };
  
      const debouncedUpdateFilters = debounce((filter, value) => {
        catalogStore.updateFilters(filter, value);
      }, 500);
  
      const toggleFilter = (filter, value) => {
        debouncedUpdateFilters(filter, value);
      };
  
      return {
        filters,
        filterLabels,
        toggleFilter,
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .filter__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .filter__label {
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  </style>