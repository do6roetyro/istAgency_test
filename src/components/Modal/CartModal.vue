<template lang="pug">
  div.cart-modal(v-if="isOpen")
    div.cart-modal__overlay(@click="closeCart")
    div.cart-modal__content
      button.cart-modal__close(@click="closeCart") ✕
      h2.cart-modal__title Корзина
      p.cart-modal__item-count {{ cartItemCount }} {{itemCountLabel}}
      button.cart-modal__clear(@click="clearCart" :disabled="cartItemCount === 0") {{cartItemCount === 0 ? 'Корзина пуста' : 'Очистить список'}}
      div.cart-modal__container
        ul.cart-modal__list
          li.cart-modal__item(
            :class="{ 'cart-modal__item--removed': item.removed }"
            v-for="item in cartItems"
            :key="item.product.id"
          )
            img.cart-modal__item-image(:src="item.product.imageUrl", :alt="item.product.name")
            div.cart-modal__item-details
              h3.cart-modal__item-name {{ item.product.name }}
              p.cart-modal__item-price {{ item.product.price }} ₽
            div.cart-item__controls
              button.cart-item__control-button(:disabled="item.removed" @click="decreaseQuantity(item.product.id)") -
              span.cart-item__quantity {{ item.quantity }}
              button.cart-item__control-button(:disabled="item.removed" @click="increaseQuantity(item.product.id)") +
            div.cart-item__action
              button.cart-item__remove(
                v-if="!item.removed"
                @click="removeItem(item.product.id)"
              ) ✕
              div.cart-item__icon-container(v-if="item.removed" @click="restoreItem(item.product.id)")              
                span.visually-hidden восстановить
                svg.cart-item__icon(width="24" height="24")
                  use(xlink:href="#icon-repeat")
            div.cart-item__overlay(v-if="item.removed")
        div.cart-modal__footer
          p.cart-modal__total 
            span Итого 
            span {{ cartTotalPrice }} ₽
          button.cart-modal__checkout(@click="checkout") Оформить заказ
  </template>

<script>
import { useCartStore } from "@/store/cartStore";
import { computed, watch } from "vue";
import { getDeclension } from "@/utilites/getDeclension";
import { addNoScroll, removeNoScroll } from "@/utilites/noScroll";

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    itemCount: {
      type: Number,
      required: true,
    },
  },
  emits: ["close-cart"],
  setup(props, { emit }) {
    const cartStore = useCartStore();

    // Методы управления корзиной
    const cartItemCount = computed(() => cartStore.cartItemCount);
    const cartTotalPrice = computed(() => cartStore.cartTotalPrice);
    const cartItems = computed(() => cartStore.cartItems);

    // Сложение склонений
    const itemCountLabel = computed(() =>
      getDeclension(cartItemCount.value, "товар", "товара", "товаров")
    );


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

    const closeCart = () => {
      emit("close-cart");
      removeNoScroll();
    };

    // Watch для изменения состояния модального окна
    watch(
      () => props.isOpen,
      (newVal) => {
        if (newVal) {
          addNoScroll();
        } else {
          removeNoScroll();
        }
      },
      { immediate: true } // Запускаем при инициализации
    );

    return {
      closeCart,
      cartItemCount,
      cartTotalPrice,
      cartItems,
      itemCountLabel,
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
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: end;
  z-index: 1000;
  max-width: 1920px;
}

.cart-modal__item {
  &--removed {
    position: relative;
    pointer-events: none;

    .cart-item__icon-container {
      cursor: pointer;
      pointer-events: auto;

      &:hover {
        filter: brightness(0);
      }
    }
  }
}

.cart-modal__item--removed .cart-modal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

.cart-item__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  pointer-events: none;
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
  color: rgba(31, 32, 32, 0.4);
  cursor: pointer;
  font-size: 14px;
  font-weight: 300;
  line-height: 15.68px;
  border: none;
  background-color: transparent;
  margin-left: auto;
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
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;

  &:first-child {
    border-top: 1px solid #f0f0f0;
  }
}

.cart-modal__item-image {
  width: 96px;
  height: 96px;
  object-fit: cover;
  margin-right: 15px;
}

.cart-modal__item-details {
  flex-grow: 1;
  min-width: 165px;
  margin-right: 62px;
}

.cart-modal__item-name {
  font-weight: 500;
  margin: 0;
  color: #1f2020;
  font-size: 16px;
  font-weight: 300;
  line-height: 17.92px;
  letter-spacing: 0.02em;
}

.cart-modal__item-price {
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  color: #1f2020;
}

.cart-item__controls {
  display: flex;
  align-items: center;
  gap: 17px;
  justify-content: center;
  margin-right: 37px;
}

.cart-item__control-button {
  width: 40px;
  height: 24px;
  background-color: #f2f2f2;
  border: none;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  margin: 0;
  border-radius: 4px;
  transition: background-color 0.15s;

  &:hover {
    background-color: #bbbbbb;
  }
}

.cart-item__quantity {
  font-size: 16px;
  line-height: 16px;
}

.cart-item__remove {
  background: none;
  border: none;
  font-size: 18px;
  color: #1f2020;
  cursor: pointer;
  opacity: 0.2;

  &:hover {
    opacity: 1;
  }
}

.cart-modal__container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: -webkit-fill-available;
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
  span {
    display: block;

    &:first-child {
      font-size: 16px;
      font-weight: 400;
      line-height: 16px;
    }

    &:last-child {
      font-size: 30px;
      font-weight: 500;
      line-height: 30px;
      letter-spacing: -0.02em;
    }
  }
}

.cart-modal__checkout {
  padding: 20px 57px;
  background-color: #7bb899;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Inter";
  font-size: 12px;
  font-weight: 500;
  line-height: 14.52px;
  letter-spacing: 0.06em;
  text-align: center;
  text-transform: uppercase;
}

.cart-item__icon-container {
  cursor: pointer;
  margin-left: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
