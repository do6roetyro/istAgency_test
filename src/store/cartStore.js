import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        cartItems: {},
    }),
    getters: {
        cartItemCount(state) {
            return Object.values(state.cartItems).reduce((total, item) => {
                return !item.removed ? total + item.quantity : total;
            }, 0);
        },
        cartTotalPrice(state) {
            const total = Object.values(state.cartItems).reduce(
                (sum, item) => {
                    return !item.removed ? sum + item.product.price * item.quantity : sum;
                },
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
                this.cartItems[product.id].removed = false; // Если товар был удален ранее, восстанавливаем его
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
            if (this.cartItems[productId] && !this.cartItems[productId].removed) {
                this.cartItems[productId].quantity = quantity;
                if (quantity <= 0) {
                    this.cartItems[productId].removed = true;
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