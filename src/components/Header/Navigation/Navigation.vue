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


<style lang="scss" scoped>
.navigation__list {
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.06em;
  color: #1F2020;
  text-transform: uppercase;
  display: flex;
  gap: 12px;
}

.navigation__link {
  padding: 6px;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.7;
  }
}
</style>
