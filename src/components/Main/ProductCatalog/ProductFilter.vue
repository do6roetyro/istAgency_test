<template lang="pug">
  .filter
    .filter__header(@click="toggleMenu" v-if="isMobileView") Фильтры
    transition(name="slide-up")
      .filter__list(v-if="!isMobileView || isMenuOpen")
        label.filter__label(v-for="(label, filter) in filterLabels" :key="filter")
          ToggleSwitch(
            :modelValue="filters[filter]"
            @update:modelValue="value => toggleFilter(filter, value)"
          )
          span {{ label }}
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useCatalogStore } from "@/store/catalogStore";
import { debounce } from "@/utilites/debounce";
import ToggleSwitch from "@/components/UIKit/ToggleSwitch.vue";

export default {
  components: {
    ToggleSwitch,
  },
  setup() {
    const catalogStore = useCatalogStore();
    const filters = catalogStore.filters;
    const isMenuOpen = ref(false); // Управление состоянием меню
    const windowWidth = ref(window.innerWidth); // Отслеживание ширины окна

    const filterLabels = {
      isNew: "Новинки",
      inStock: "Есть в наличии",
      isContract: "Контрактные",
      isExclusive: "Эксклюзивные",
      onSale: "Распродажа",
    };

    const debouncedUpdateFilters = debounce((filter, value) => {
      catalogStore.updateFilters(filter, value);
    }, 500);

    const toggleFilter = (filter, value) => {
      debouncedUpdateFilters(filter, value);
    };

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const isMobileView = computed(() => windowWidth.value <= 769); // Определение мобильного представления

    const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", updateWindowWidth);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", updateWindowWidth);
    });

    return {
      filters,
      filterLabels,
      toggleFilter,
      toggleMenu,
      isMenuOpen,
      isMobileView,
    };
  },
};
</script>

<style lang="scss" scoped>
.filter {
  position: relative;

  @media (max-width: 769px) {
    position: absolute;
    top: 56px;
  }
}

.filter__header {
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  background: #f8f8f8;
  border: 1px solid #ddd;
  text-transform: uppercase;
  display: none;
  /* Скрыт по умолчанию */

  @media (max-width: 769px) {
    display: block;
    position: relative;
    left: 14px;
    border: none;
    background-color: transparent;
    font-size: 12px;
    font-weight: 500;
    line-height: 14.52px;
    letter-spacing: 0.06em;
  }
}

.filter__list {
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 769px) {
    padding-top: 54px;
    padding-left: 24px;
    padding-right: 24px;
    position: absolute;
    width: 100vw;
    height: 80dvh;
    top: 160px;
    z-index: 999;
    background-color: #ffffff;
    border-radius: 24px 0;

    &::before {
      content: "";
      width: 28px;
      height: 4px;
      background-color: #1f2020;
      opacity: 0.6;
      border-radius: 40px;
      top: 12px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
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

/* Анимация для меню */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
