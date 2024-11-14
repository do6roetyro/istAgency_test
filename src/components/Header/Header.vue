<template lang="pug">
  header.header
    div.header__wrapper.wrapper
      div.header__container
        Logo.header__logo
        Navigation(:isDropdown="isDropdown").header__navigation
      div.header__container 
        ContactInfo.header__contact-info
        UserBlock.header__user-block(@open-cart="openCart")
  </template>

<script>
import { ref } from "vue";
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
  emits: ["open-cart"],
  setup(props, { emit }) {
    const isDropdown = ref(window.innerWidth < 768);

    const openCart = () => {
      emit("open-cart");
    };

    return {
      isDropdown,
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
  padding-top: 36px;
  padding-bottom: 36px;
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
