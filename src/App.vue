<template lang="pug">
  div#app
    Header(@open-cart="openCart")
    Main
    Footer
    CartModal(:isOpen="isCartOpen" @close-cart="closeCart")
</template>

<script>
import Header from "./components/Header/Header.vue";
import Main from "./components/Main/Main.vue";
import CartModal from "./components/Modal/CartModal.vue";
import Footer from "./components/Footer/Footer.vue";
import { ref } from "vue";

export default {
  components: {
    Header,
    Main,
    Footer,
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

<style lang="scss" scoped>
div {
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}
</style>
