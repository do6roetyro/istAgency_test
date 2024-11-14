<template lang="pug">
  button.cart__button(@click="openCart")
    span.visually-hidden корзина
    svg.cart__icon(width="24" height="24")
      use(xlink:href="#icon-cart")
    span.cart__count(v-if="cartItemCount > 0") {{ cartItemCount }}
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
.cart__button {
  position: relative;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
}

.cart__count {
  position: absolute;
  top: 0px;
  right: 0.7px;
  min-width: 24px;
  min-height: 24px;
  background: rgba(123, 184, 153, 1);
  color: rgba(31, 32, 32, 1);
  border-radius: 50px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  line-height: 14.52px;
  letter-spacing: 0.06em;
  text-align: center;
}

.cart__icon {
  width: clamp(16px, 2.3vw, 24px);
  height: clamp(16px, 2.3vw, 24px);

  @media(max-width: 768px) {
    width: 24px;
    height: 24px;
  }
}
</style>