<template lang="pug">
  .filter
    .filter__list
      label.filter__label(v-for="(label, filter) in filterLabels" :key="filter")
        .toggle(@click="toggleFilter(filter)")
          input.toggle__checkbox(type="checkbox" :checked="filters[filter]")
          .toggle__switch
        span {{ label }}
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

.toggle{
  position: relative;
  width: 65px;
  height: 24px;
  cursor: pointer;
}

.toggle__checkbox {
  display: none;
}

.toggle__switch {
  width: 36px;
  height: 22px;
  background-color: rgba(242, 242, 242, 1);
  border-radius: 12px;
  position: relative;
  transition: background-color 0.3s ease;

  &::after {
    content: "";
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background-color: rgba(31, 32, 32, 1);
  border-radius: 50%;
  transition: left 0.3s ease;
  }
}

.toggle__checkbox:checked + .toggle__switch::after {
  left: 22px;
}

.toggle__checkbox:checked + .toggle__switch {
  background-color: rgba(123, 184, 153, 1);
}
</style>