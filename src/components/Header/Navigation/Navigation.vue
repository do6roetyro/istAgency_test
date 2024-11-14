<template lang="pug">
  nav(:class="{ dropdown: isDropdown }").navigation
    ul.navigation__list
      li.navigation__item(v-for="(item, index) in navItems" :key="index")
        a.navigation__link(href="#") {{ item }}
</template>

<script>
export default {
  props: {
    isDropdown: {
      type: Boolean,
      default: false
    },
    navItems: {
      type: Array,
      default: () => ["Продукты", "Цвета", "Вдохновение", "Советы", "Найти магазин"]
    }
  }
};
</script>
