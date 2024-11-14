<template lang="pug">
  div.sort
    div.overlay(v-if="isDropdownOpen", @click="toggleDropdown")
    div.sort__selected(@click="toggleDropdown") {{ currentSortLabel }}
    transition(name="fade")
      ul.sort__dropdown(v-if="isDropdownOpen")
        li.sort__item(@click="changeSortOption('priceDesc')") Сначала дорогие
        li.sort__item(@click="changeSortOption('priceAsc')") Сначала недорогие
        li.sort__item(@click="changeSortOption('popular')") Сначала популярные
        li.sort__item(@click="changeSortOption('new')") Сначала новые
</template>

<script>
import { useCatalogStore } from "@/store/catalogStore";
import { debounce } from "@/utilites/debounce";
import { ref } from "vue";

export default {
  setup() {
    const catalogStore = useCatalogStore();
    const isDropdownOpen = ref(false);
    const currentSortLabel = ref("Сначала дорогие");

    const debouncedChangeSortOption = debounce((sortOption) => {
      catalogStore.updateSortOption(sortOption);
    }, 500);

    const changeSortOption = (sortOption) => {
      isDropdownOpen.value = false;
      currentSortLabel.value = getSortLabel(sortOption);
      debouncedChangeSortOption({ target: { value: sortOption } });
    };

    const getSortLabel = (sortOption) => {
      switch (sortOption) {
        case "priceDesc":
          return "Сначала дорогие";
        case "priceAsc":
          return "Сначала недорогие";
        case "popular":
          return "Сначала популярные";
        case "new":
          return "Сначала новые";
        default:
          return "По умолчанию";
      }
    };

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    return {
      isDropdownOpen,
      currentSortLabel,
      changeSortOption,
      toggleDropdown,
    };
  },
};
</script>

<style lang="scss" scoped>
.sort {
  position: relative;
  display: inline-block;
  cursor: pointer;
  min-width: 280px;
  font-size: 12px;
  font-weight: 500;
  line-height: 14.52px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9;
}

.sort__selected {
  min-width: 280px;
  padding: 17px 24px;
  border-radius: 4px;
  background-color: #fff;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 5px;

  &::after {
    content: "";
    display: inline-block;
    position: relative;
    bottom: 1px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #000; 
  }
}

.sort__dropdown {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
  margin: 0;
}

.sort__item {
  padding: 17px 24px;
  cursor: pointer;
  &:hover {
    background-color: #7bb899;
  }
}
</style>
