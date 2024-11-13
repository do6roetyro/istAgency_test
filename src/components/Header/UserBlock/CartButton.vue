<template lang="pug">
  button.cart__button(@click="openCart")
    span.visually-hidden корзина
    svg.cart__icon(width="24" height="24")
      use(xlink:href="#icon-cart")
    span.cart__count(v-if="cartItemCount > 0") {{ cartItemCount }}
</template>
    
<script>
import { useCatalogStore } from "@/store/store";
import { computed } from "vue";

export default {
  emits: ["open-cart"],
  setup(props, { emit }) {
    const catalogStore = useCatalogStore();

    const openCart = () => {
      emit("open-cart");
    };

    const cartItemCount = computed(() => catalogStore.cartItemCount);

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