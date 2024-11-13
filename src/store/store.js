import { defineStore } from "pinia";
import axios from "axios";

export const useCatalogStore = defineStore("catalog", {
  state: () => ({
    products: [],
    filteredProducts: [],
    cart: {},
    filters: {
      isNew: false,
      inStock: false,
      isContract: false,
      isExclusive: false,
      onSale: false,
    },
    sortOption: "default",
  }),
  getters: {
    cartItemCount(state) {
      return Object.values(state.cart).reduce((total, item) => total + item.quantity, 0);
    },
    cartTotalPrice(state) {
      return Object.values(state.cart).reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },
    cartItems(state) {
      return Object.values(state.cart);
    },
  },
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get(
          "https://673203f17aaf2a9aff131bdc.mockapi.io/api/catalog/Paints"
        );
        this.products = response.data;
        this.applyFilters();
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
      }
    },
    addToCart(product) {
      if (this.cart[product.id]) {
        this.cart[product.id].quantity += 1;
      } else {
        this.cart[product.id] = {
          product,
          quantity: 1,
          removed: false,
        };
      }
    },

    removeFromCart(productId) {
      if (this.cart[productId]) {
        delete this.cart[productId];
      }
    },

    updateCartItemQuantity(productId, quantity) {
      if (this.cart[productId]) {
        this.cart[productId].quantity = quantity;
        if (quantity <= 0) {
          delete this.cart[productId];
        }
      }
    },

    clearCart() {
      this.cart = {};
    },

    toggleRemovedStatus(productId) {
      if (this.cart[productId]) {
        this.cart[productId].removed = !this.cart[productId].removed;
      }
    },

    updateFilters(filterName, value) {
      this.filters[filterName] = value;
      this.applyFilters();
    },
    applyFilters() {
      let filtered = this.products.filter((product) => {
        return Object.keys(this.filters).every((filter) => {
          return this.filters[filter] ? product[filter] === true : true;
        });
      });

      this.filteredProducts = filtered;
      this.applySort();
    },
    updateSortOption(option) {
      this.sortOption = option;
      this.applySort();
    },
    applySort() {
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

      this.filteredProducts = sorted;
    },
  },
});