<template lang="pug">
    .filter
      .filter__list
        label.filter__label(v-for="(label, filter) in filterLabels" :key="filter")
          input.filter__input(type="checkbox" :checked="filters[filter]" @change="toggleFilter(filter)")
          | {{ label }}
  </template>

<script>
import { useCatalogStore } from "@/store/catalogStore";
import { debounce } from "@/utilites/debounce";

export default {
  setup() {
    const catalogStore = useCatalogStore();
    const filters = catalogStore.filters;
    const filterLabels = {
      isNew: "Новинки",
      inStock: "Есть в наличии",
      isContract: "Контрактные",
      isExclusive: "Эксклюзивные",
      onSale: "Распродажа",
    };

    const debouncedUpdateFilters = debounce((filter) => {
      catalogStore.updateFilters(filter, !catalogStore.filters[filter]);
    }, 500); 

    const toggleFilter = (filter) => {
      debouncedUpdateFilters(filter);
    };

    return {
      filters,
      filterLabels,
      toggleFilter,
    };
  },
};
</script>
