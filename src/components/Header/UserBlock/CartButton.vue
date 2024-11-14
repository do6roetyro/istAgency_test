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
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px 5px;
  font-size: 12px;
}
</style>