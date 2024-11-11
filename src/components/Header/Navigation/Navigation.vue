<template lang="pug">
    nav(:class="{ dropdown: isDropdown }").navigation
      NavItem(name="Продукты").navigation__item
      NavItem(name="Цвета").navigation__item
      NavItem(name="Вдохновение").navigation__item
      NavItem(name="Советы").navigation__item
      NavItem(name="Найти магазин").navigation__item
    </template>
    
    <script>
    import NavItem from './NavItem.vue';
    
    export default {
      components: {
        NavItem
      },
      props: {
        isDropdown: {
          type: Boolean,
          default: false
        }
      }
    };
    </script>