<template lang="pug">
  div#app
    Header(@open-cart="openCart")
    Main
    CartModal(:isOpen="isCartOpen" @close-cart="closeCart")
</template>

<script>
import Header from "./components/Header/Header.vue";
import Main from "./components/Main/Main.vue";
import CartModal from "./components/Modal/CartModal.vue";
import { ref } from "vue";

export default {
  components: {
    Header,
    Main,
    CartModal,
  },
  setup() {
    const isCartOpen = ref(false);

    const openCart = () => {
      isCartOpen.value = true;
    };

    const closeCart = () => {
      isCartOpen.value = false;
    };

    return {
      isCartOpen,
      openCart,
      closeCart,
    };
  },
};
</script>

