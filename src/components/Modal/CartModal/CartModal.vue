<template lang="pug">
  div.cart-modal(v-if="isOpen")
    div.cart-modal__overlay(@click="closeCart")
    div.cart-modal__content
      button.cart-modal__close(@click="closeCart") ✕
      h2.cart-modal__title Корзина
      p.cart-modal__item-count {{ cartItemCount }} {{ itemCountLabel }}
      button.cart-modal__clear(@click="clearCart" :disabled="cartItemCount === 0") {{ cartItemCount === 0 ? 'Корзина пуста' : 'Очистить список' }}
      div.cart-modal__container
        CartList(
          :cart-items="cartItems"
          @decrease-quantity="decreaseQuantity"
          @increase-quantity="increaseQuantity"
          @remove-item="removeItem"
          @restore-item="restoreItem"
        )
        CartFooter(
          :cart-total-price="cartTotalPrice"
          :cart-item-count="cartItemCount"
          @checkout="checkout"
        )
</template>

<script>
import CartList from "./CartList.vue";
import CartFooter from "./CartFooter.vue";
import { computed, watch } from "vue";
import { removeNoScroll, addNoScroll } from "@/utilites/noScroll";
import { getDeclension } from "@/utilites/getDeclension";
import { useCart } from "@/composables/useCart";

export default {
  components: {
    CartList,
    CartFooter,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close-cart"],
  setup(props, { emit }) {
    const {
      cartItemCount,
      cartTotalPrice,
      cartItems,
      clearCart,
      decreaseQuantity,
      increaseQuantity,
      removeItem,
      restoreItem,
      checkout,
    } = useCart();

    const itemCountLabel = computed(() =>
      getDeclension(cartItemCount.value, "товар", "товара", "товаров")
    );

    const closeCart = () => {
      emit("close-cart");
      removeNoScroll();
    };

    const modifiedCheckout = () => {
      checkout();
      closeCart();
    };

    watch(
      () => props.isOpen,
      (newVal) => {
        if (newVal) {
          addNoScroll();
        } else {
          removeNoScroll();
        }
      },
      { immediate: true }
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
      checkout: modifiedCheckout,
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
  align-items: flex-end;
  justify-content: end;
  z-index: 1000;
  max-width: 1920px;
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
  min-width: 375px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  height: 100dvh;

  @media (max-width: 601px) {
    padding-left: 16px;
    padding-right: 16px;
    width: 100vw;
  }
}

.cart-modal__close {
  position: absolute;
  top: 24px;
  right: 30px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 100%;
  padding: 8px;
  padding-left: 12px;
  padding-right: 12px;
  color: #1f2020;

  @media (max-width: 601px) {
    right: 16px;
  }
}

.cart-modal__item-count,
.cart-modal__clear {
  font-size: 14px;
  margin: 0 0 15px;
  display: inline-block;
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

  &:hover {
    color: #1f2020;
  }

  &:disabled {
    color: rgba(31, 32, 32, 0.4);
    cursor: default;
  }
}

.cart-modal__container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: -webkit-fill-available;
}
</style>
