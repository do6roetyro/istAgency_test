<template lang="pug">
    div.cart-modal__footer
      p.cart-modal__total 
        span Итого 
        span {{ cartTotalPrice }} ₽
      button.cart-modal__checkout(
        @click="emitCheckout"
        :disabled="isCheckoutDisabled"
      ) Оформить заказ
    </template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    cartTotalPrice: {
      type: Number,
      required: true,
    },
    cartItemCount: {
      type: Number,
      required: true,
    },
  },
  emits: ["checkout"],
  setup(props, { emit }) {
    const isCheckoutDisabled = computed(() => props.cartItemCount === 0);

    const emitCheckout = () => {
      emit("checkout");
    };

    return {
      isCheckoutDisabled,
      emitCheckout,
    };
  },
});
</script>

<style lang="scss" scoped>
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
  background-color: $secondary-color;
  border: none;
  border-radius: 4px;
  color: $primary-color;
  cursor: pointer;
  font-family: "Inter";
  font-size: 12px;
  font-weight: 500;
  line-height: 14.52px;
  letter-spacing: 0.06em;
  text-align: center;
  text-transform: uppercase;
  transition: background-color 0.15s;

  @media (max-width: $mobile-resolution) {
    padding: 10px 24px;
  }

  &:hover {
    background-color: #92ccaf;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
}
</style>
