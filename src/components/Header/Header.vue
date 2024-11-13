<template lang="pug">
  header.header
    div.header__wrapper.wrapper
      div.header__container
        Logo.header__logo
        Navigation(:isDropdown="isDropdown").header__navigation
      div.header__container 
        ContactInfo.header__contact-info
        UserBlock(:cartCount="cartCount").header__user-block
  </template>

<script>
import Logo from "./Logo/Logo.vue";
import Navigation from "./Navigation/Navigation.vue";
import ContactInfo from "./ContactInfo/ContactInfo.vue";
import UserBlock from "./UserBlock/UserBlock.vue";

export default {
  components: {
    Logo,
    Navigation,
    ContactInfo,
    UserBlock,
  },
  data() {
    return {
      isDropdown: window.innerWidth < 768, // для переключения навигации
      cartCount: 0, // примерное значение количества товаров в корзине
    };
  },
};
</script>

<style lang="scss" scoped>
.header__wrapper {
  display: flex;
  justify-content: space-between;
}

.header__container {
  display: flex;
}

.header__container:first-child {
  gap: 9vw;
}
.header__container:last-child {
  gap: 6vw;
}
</style>
