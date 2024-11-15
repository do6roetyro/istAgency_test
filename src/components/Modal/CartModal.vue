<template lang="pug">
    div.cart-modal(v-if="isOpen")
      div.cart-modal__overlay(@click="closeCart")
      div.cart-modal__content
        button.cart-modal__close(@click="closeCart") ✕
        h2.cart-modal__title Корзина
        p.cart-modal__item-count {{ cartItemCount }} товара
        button.cart-modal__clear(@click="clearCart") Очистить список
        ul.cart-modal__list
          li.cart-modal__item(v-for="item in cartItems" :key="item.product.id")
            img.cart-modal__item-image(:src="item.product.imageUrl", :alt="item.product.name")
            div.cart-modal__item-details
              h3.cart-modal__item-name {{ item.product.name }}
              p.cart-modal__item-price {{ item.product.price }} ₽
              div.cart-item__controls
                button.cart-item__control-button(@click="decreaseQuantity(item.product.id)") -
                span.cart-item__quantity {{ item.quantity }}
                button.cart-item__control-button(@click="increaseQuantity(item.product.id)") +
            button.cart-item__remove(@click="removeItem(item.product.id)") ✕
            div(v-if="item.removed" class="cart-item__removed")
              p Товар удален
              button.cart-item__restore(@click="restoreItem(item.product.id)") Восстановить
        div.cart-modal__footer
          p.cart-modal__total Итог: {{ cartTotalPrice }} ₽
          button.cart-modal__checkout(@click="checkout") Оформить заказ
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
      alert("Заказ оформлен");
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
  display: flex;
  align-items: flex-start;
  justify-content: end;
  z-index: 1000;
}

.cart-modal__overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
}

.cart-modal__content {
  position: relative;
  background: #fff;
  padding: 30px;
  width: 600px;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  height: 100%;
}

.cart-modal__close {
  position: absolute;
  top: 32px;
  right: 40px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 100%;
  padding: 8px;
  padding-left: 12px;
  padding-right: 12px;
}

.cart-modal__item-count,
.cart-modal__clear {
  font-size: 14px;
  margin: 0 0 15px;
  display: inline-block;
}

.cart-modal__item-count {
  color: #333;
}

.cart-modal__title {
  font-size: 30px;
  font-weight: 500;
  line-height: 26.4px;
  letter-spacing: -0.04em;
  margin: 0;
  padding-bottom: 94px;
}

.cart-modal__clear {
  color: #999;
  cursor: pointer;
  float: right;
}

.cart-modal__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-modal__item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.cart-modal__item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 15px;
}

.cart-modal__item-details {
  flex-grow: 1;
}

.cart-modal__item-name {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: #333;
}

.cart-modal__item-price {
  font-size: 14px;
  color: #666;
}

.cart-item__controls {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.cart-item__control-button {
  width: 30px;
  height: 30px;
  background: #f7f7f7;
  border: none;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  margin: 0 5px;
}

.cart-item__quantity {
  font-size: 14px;
  font-weight: 500;
}

.cart-item__remove {
  background: none;
  border: none;
  font-size: 18px;
  color: #ccc;
  cursor: pointer;
}

.cart-item__removed {
  display: flex;
  align-items: center;
  color: #999;
  font-size: 14px;
  margin-top: 5px;
}

.cart-item__restore {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
}

.cart-modal__footer {
  margin-top: auto;
  position: relative;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.cart-modal__total {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.cart-modal__checkout {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}
</style>
