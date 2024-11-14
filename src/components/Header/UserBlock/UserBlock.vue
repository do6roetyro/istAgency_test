<template lang="pug">
    div.user-block
      Search.user-block__search.search
      User.user-block__user.user
      Favorites.user-block__favourites.favourites
      CartButton.user-block__cart.cart(@open-cart="openCart")
    </template>

<script>
import Search from './Search.vue';
import User from './User.vue';
import Favorites from './Favorites.vue';
import CartButton from './CartButton.vue';

export default {
  components: {
    Search,
    User,
    Favorites,
    CartButton,
  },
  emits: ["open-cart"],
  setup(props, { emit }) {
    const openCart = () => {
      emit("open-cart");
    };

    return {
      openCart,
    };
  },
};
</script>


<style lang="scss" scoped>
.user-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25vw;

  &>* {
    transition: opacity 0.15s;

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>