<template lang="pug">
    div.cart-modal(v-if="isOpen")
      div.cart-modal__overlay(@click="closeCart")
      div.cart-modal__content
        button.cart-modal__close(@click="closeCart") ✕
        h2 Корзина
        p Общее количество товаров: {{ cartItemCount }}
        button(@click="clearCart") Очистить список
        ul.cart-modal__list
          li.cart-modal__item(v-for="item in cartItems" :key="item.product.id")
            img(:src="item.product.imageUrl", :alt="item.product.name")
            div
              h3 {{ item.product.name }}
              p Цена: {{ item.product.price }} ₽
              div.cart-item__controls
                button(@click="decreaseQuantity(item.product.id)") -
                span {{ item.quantity }}
                button(@click="increaseQuantity(item.product.id)") +
              button(@click="removeItem(item.product.id)") ✕
              div(v-if="item.removed")
                p Товар удален
                button(@click="restoreItem(item.product.id)") Восстановить
        p Итоговая сумма: {{ cartTotalPrice }} ₽
        button(@click="checkout") Оформить заказ
  </template>

<script>
import { useCartStore } from "@/store/cartStore";
import { computed } from "vue";

export default {
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["close-cart"],
    setup(props, { emit }) {
        const cartStore = useCartStore();

        const closeCart = () => {
            emit("close-cart");
        };

        const cartItemCount = computed(() => cartStore.cartItemCount);
        const cartTotalPrice = computed(() => cartStore.cartTotalPrice);
        const cartItems = computed(() => cartStore.cartItems);

        const clearCart = () => {
            cartStore.clearCart();
        };

        const decreaseQuantity = (productId) => {
            const cartItem = cartStore.cartItems[productId];
            if (cartItem) {
                const currentQuantity = cartItem.quantity;
                cartStore.updateCartItemQuantity(productId, currentQuantity - 1);
            }
        };

        const increaseQuantity = (productId) => {
            const cartItem = cartStore.cartItems[productId];
            if (cartItem) {
                const currentQuantity = cartItem.quantity;
                cartStore.updateCartItemQuantity(productId, currentQuantity + 1);
            }
        };

        const removeItem = (productId) => {
            cartStore.toggleRemovedStatus(productId);
        };

        const restoreItem = (productId) => {
            cartStore.toggleRemovedStatus(productId);
        };

        const checkout = () => {
            // Логика оформления заказа
            // alert("Заказ оформлен!");
            cartStore.clearCart();
            closeCart();
        };

        return {
            closeCart,
            cartItemCount,
            cartTotalPrice,
            cartItems,
            clearCart,
            decreaseQuantity,
            increaseQuantity,
            removeItem,
            restoreItem,
            checkout,
        };
    },
};
</script>

<style lang="scss" scoped>
.cart-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.cart-modal__overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.cart-modal__content {
    position: relative;
    background: white;
    margin: auto;
    padding: 20px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
}

.cart-modal__close {
    position: absolute;
    top: 10px;
    right: 10px;
}

.cart-modal__list {
    list-style: none;
    padding: 0;
}

.cart-modal__item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.cart-item__controls {
    display: flex;
    align-items: center;
}

.cart-item__controls button {
    margin: 0 5px;
}
</style>