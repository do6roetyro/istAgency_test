import { defineStore } from 'pinia';

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    products: [],
    cart: [],
  }),
  actions: {
    addToCart(product) {
      this.cart.push(product);
    },
  },
});