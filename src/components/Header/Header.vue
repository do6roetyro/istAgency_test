<template lang="pug">
  header.header
    div.header__wrapper.wrapper
      BurgerMenu.header__burger(:isDropdown="isDropdown" @toggle-dropdown="toggleDropdown")
      Logo.header__logo
      CartButton.header__cart(@open-cart="openCart")
      Navigation.header__navigation(v-if="!isMobile" :isDropdown="isDropdown")
      .header__container(v-if="!isMobile")
        ContactInfo.header__contact-info
        UserBlock.header__user-block(@open-cart="openCart")
    .header__dropdown(v-if="isDropdown")
      Navigation(:isDropdown="isDropdown").header__navigation
  </template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Logo from "./Logo/Logo.vue";
import Navigation from "./Navigation/Navigation.vue";
import ContactInfo from "./ContactInfo/ContactInfo.vue";
import UserBlock from "./UserBlock/UserBlock.vue";
import CartButton from "./UserBlock/CartButton.vue";
import BurgerMenu from "../UIKit/BurgerMenu.vue";

export default {
  components: {
    Logo,
    Navigation,
    ContactInfo,
    UserBlock,
    CartButton,
    BurgerMenu,
  },
  emits: ["open-cart"],
  setup(props, { emit }) {
    const isMobile = ref(window.innerWidth < 769);
    const isDropdown = ref(false);

    const updateScreenSize = () => {
      isMobile.value = window.innerWidth < 769;
      if (!isMobile.value) isDropdown.value = false;
    };

    const toggleDropdown = () => {
      isDropdown.value = !isDropdown.value;
    };

    const openCart = () => {
      emit("open-cart");
    };

    onMounted(() => window.addEventListener("resize", updateScreenSize));
    onBeforeUnmount(() =>
      window.removeEventListener("resize", updateScreenSize)
    );

    return {
      isMobile,
      isDropdown,
      toggleDropdown,
      openCart,
    };
  },
};
</script>

<style lang="scss" scoped>
.header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: clamp(21px, 3vw, 36px);
  padding-bottom: clamp(21px, 3vw, 36px);
}

.header__logo {
  @media (max-width: 769px) {
    margin: 0 auto;
  }
}

.header__container {
  display: flex;
  align-items: center;
  gap: 6vw;
  @media(max-width: 1024px) {
    gap: 3vw;
  }
}

.header__navigation {
  display: flex;
}

.header__cart,
.header__burger {
  display: none;
  @media (max-width: 769px) {
    display: block;
  }
}

.header__dropdown {
  position: absolute;
  left: 0;
  right: 0;
  top: 68px;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
  border-top: 0.5px solid #1f2020;
}
</style>
