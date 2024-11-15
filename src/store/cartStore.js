import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        cartItems: {},
    }),
    getters: {
        cartItemCount(state) {
            return Object.values(state.cartItems).reduce((total, item) => total + item.quantity, 0);
        },
        cartTotalPrice(state) {
            const total = Object.values(state.cartItems).reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            );
            return total.toLocaleString('ru-RU');
        },
        cartItemsList(state) {
            return Object.values(state.cartItems);
        },
    },
    actions: {
        addToCart(product) {
            if (this.cartItems[product.id]) {
                this.cartItems[product.id].quantity += 1;
            } else {
                this.cartItems[product.id] = {
                    product,
                    quantity: 1,
                    removed: false,
                };
            }
        },
        removeFromCart(productId) {
            if (this.cartItems[productId]) {
                delete this.cartItems[productId];
            }
        },
        updateCartItemQuantity(productId, quantity) {
            if (this.cartItems[productId]) {
                this.cartItems[productId].quantity = quantity;
                if (quantity <= 0) {
                    delete this.cartItems[productId];
                }
            }
        },
        clearCart() {
            this.cartItems = {};
        },
        toggleRemovedStatus(productId) {
            if (this.cartItems[productId]) {
                this.cartItems[productId].removed = !this.cartItems[productId].removed;
            }
        },
    },
});