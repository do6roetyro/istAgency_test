<template lang="pug">
    ul.user-block__list
      Search.user-block__item.search
      User.user-block__item.user
      Favorites.user-block__item.favourites
      Cart(:cartCount="cartCount").user-block__item.cart
    </template>
    
    <script>
    import Search from './Search.vue';
    import User from './User.vue';
    import Favorites from './Favorites.vue';
    import Cart from './Cart.vue';
    
    export default {
      components: {
        Search,
        User,
        Favorites,
        Cart
      },
      props: {
        cartCount: {
          type: Number,
          default: 0
        }
      }
    };
    </script>