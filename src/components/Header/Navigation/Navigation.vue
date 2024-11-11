<template lang="pug">
    nav(:class="{ dropdown: isDropdown }").navigation
      NavItem(name="Продукты")
      NavItem(name="Цвета")
      NavItem(name="Вдохновение")
      NavItem(name="Советы")
      NavItem(name="Найти магазин")
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