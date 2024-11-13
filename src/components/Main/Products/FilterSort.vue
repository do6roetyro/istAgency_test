<template lang="pug">
  section.filter-sort
    .filters
      label(v-for="(value, filter) in filters" :key="filter")
        input(type="checkbox" :checked="value" @change="toggleFilter(filter)")
        | {{ filterLabels[filter] }}
    .sort
      select(@change="changeSortOption($event)")
        option(value="priceAsc") Сначала дешевые
        option(value="priceDesc") Сначала дорогие
</template>

<script>
import { useCatalogStore } from '@/store/catalogStore';

export default {
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

    const toggleFilter = (filter) => {
      catalogStore.updateFilters(filter, !catalogStore.filters[filter]);
    };

    const changeSortOption = (event) => {
      catalogStore.updateSortOption(event.target.value);
    };

    return {
      filters,
      filterLabels,
      toggleFilter,
      changeSortOption,
    };
  },
};
</script>

<style lang="scss" scoped>
.filter-sort {
  /* Стили для блока фильтрации и сортировки */
}
</style>
