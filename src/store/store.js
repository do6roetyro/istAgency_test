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
    sortOption: "priceAsc",
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get(
          "https://673203f17aaf2a9aff131bdc.mockapi.io/api/catalog/Paints"
        );
        this.products = response.data;
        this.filteredProducts = response.data;
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
      this.filteredProducts = this.products.filter((product) => {
        return Object.keys(this.filters).every((filter) => {
          return this.filters[filter]
            ? product[filter] === this.filters[filter]
            : true;
        });
      });
      this.applySort();
    },
    updateSortOption(option) {
      this.sortOption = option;
      this.applySort();
    },
    applySort() {
      if (this.sortOption === "priceAsc") {
        this.filteredProducts.sort((a, b) => a.price - b.price);
      } else {
        this.filteredProducts.sort((a, b) => b.price - a.price);
      }
    },
  },
});
