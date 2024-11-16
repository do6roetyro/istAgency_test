<template lang="pug">
  button.cart-button(@click="openCart")
    span.visually-hidden корзина
    svg.cart-button__icon(width="24" height="24")
      use(xlink:href="#icon-cart")
    span.cart-button__count(v-if="cartItemCount > 0") {{ cartItemCount }}
</template>

<script>
import { useCartStore } from "@/store/cartStore";
import { computed } from "vue";

export default {
  emits: ["open-cart"],
  setup(props, { emit }) {
    const cartStore = useCartStore();

    const openCart = () => {
      emit("open-cart");
    };

    const cartItemCount = computed(() => cartStore.cartItemCount);

    return {
      openCart,
      cartItemCount,
    };
  },
};
</script>

<style lang="scss" scoped>
.cart-button {
  position: relative;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
}

.cart-button__count {
  position: absolute;
  top: -2px;
  right: -2px;
  min-width: 25px;
  min-height: 25px;
  background: rgba(123, 184, 153, 1);
  color: rgba(31, 32, 32, 1);
  border-radius: 50px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  line-height: 14.52px;
  letter-spacing: 0.06em;
  text-align: center;

  @media (max-width: $mobile-resolution) {
    right: 0;
    top: 0;
  }
}

.cart-button__icon {
  width: clamp(16px, 2.3vw, 24px);
  height: clamp(16px, 2.3vw, 24px);

  @media (max-width: $mobile-resolution) {
    width: 24px;
    height: 24px;
  }
}
</style>
