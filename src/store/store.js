import { defineStore } from "pinia";
import axios from "axios";

export const useCatalogStore = defineStore("catalog", {
  state: () => ({
    products: [],
    filteredProducts: [],
    cart: [],
    filters: {
      isNew: false,
      inStock: false,
      isContract: false,
      isExclusive: false,
      onSale: false,
    },
    sortOption: "default",
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get(
          "https://673203f17aaf2a9aff131bdc.mockapi.io/api/catalog/Paints"
        );
        this.products = response.data;
        this.applyFilters(); // Применяем фильтры после загрузки данных
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
      }
    },
    addToCart(product) {
      this.cart.push(product);
    },
    updateFilters(filterName, value) {
      this.filters[filterName] = value;
      this.applyFilters();
    },
    applyFilters() {
      // Фильтрация товаров без мутации массива
      let filtered = this.products.filter((product) => {
        return Object.keys(this.filters).every((filter) => {
          return this.filters[filter] ? product[filter] === true : true;
        });
      });

      // Обновляем filteredProducts без мутации
      this.filteredProducts = filtered;
      this.applySort();
    },
    updateSortOption(option) {
      this.sortOption = option;
      this.applySort();
    },
    applySort() {
      // Создаем новый массив для сортировки
      let sorted = [...this.filteredProducts];

      switch (this.sortOption) {
        case "priceAsc":
          sorted.sort((a, b) => a.price - b.price);
          break;
        case "priceDesc":
          sorted.sort((a, b) => b.price - a.price);
          break;
        case "popular":
          sorted.sort((a, b) => (b.countOfPurchases || 0) - (a.countOfPurchases || 0));
          break;
        case "new":
          sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
          break;
        case "default":
        default:
          sorted.sort((a, b) => a.id - b.id);
          break;
      }

      // Обновляем filteredProducts без мутации
      this.filteredProducts = sorted;
    },
  },
});