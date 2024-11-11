<template lang="pug">
  button.cart__button(@click="openCart")
    span.visually-hidden корзина
    svg.cart__icon(width="24" height="24")
      use(xlink:href="#icon-cart")
    if cartCount > 0
      span.cart__count {{ cartCount }}
  </template>
    
    <script>
    export default {
      props: {
        cartCount: {
          type: Number,
          default: 0
        }
      },
      methods: {
        openCart() {
          // Логика открытия окна корзины
        }
      }
    };
    </script>