<template lang="pug">
  header.header
    div.header__wrapper.wrapper
      BurgerMenu.header__burger(:isDropdown="isDropdown" @toggle-dropdown="toggleDropdown")
      Logo.header__logo
      CartButton.header__cart(@open-cart="openCart")
      
      // Десктопная версия навигации
      Navigation.header__navigation--desktop(v-if="!isMobile")

      .header__container(v-if="!isMobile")
        ContactInfo.header__contact-info
        UserBlock.header__user-block(@open-cart="openCart")
    
    // Выпадающее меню для мобильной версии
    div.header__dropdown(v-if="isDropdown && isMobile")
      Navigation.header__navigation--mobile
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
    const isMobile = ref(window.innerWidth <= 768);
    const isDropdown = ref(false);

    const updateScreenSize = () => {
      isMobile.value = window.innerWidth <= 768;
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
  @media (max-width: 769px) {
    border-bottom: 1px solid rgba(31, 32, 32, 0.06);
    padding-left: 0;
    padding-right: 0;
    margin-left: 3.4vw;
    margin-right: 3.4vw;
  }
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
  @media (max-width: 1024px) {
    gap: 3vw;
  }
  @media (max-width: 769px) {
    display: none; // Скрываем на мобильных экранах
  }
}

.header__navigation--desktop {
  display: flex;
  @media (max-width: 769px) {
    display: none; // скрываем только на мобильных экранах для десктопной версии
  }
}

.header__navigation--mobile {
  display: none; // скрыта по умолчанию
  @media (max-width: 769px) {
    display: flex; // показываем только в бургер-меню на мобильных экранах
    flex-direction: column;
  }
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
  top: 74px;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
  // border-top: 0.5px solid #1f2020;
}
</style>
