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
  font-size: clamp(10px, 1.2vw, 14px);
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.06em;
  color: $primary-color;
  text-transform: uppercase;
  display: flex;
  gap: 0.63vw;
  margin: 0;

  @media (max-width: $mobile-resolution) {
    flex-direction: column;
    gap: 16px;
  }
}

.navigation__link {
  padding: 6px;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.7;
  }
}
</style>
