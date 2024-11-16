<template lang="pug">
  nav.breadcrumbs
    ul.breadcrumbs__list
      li.breadcrumbs__item(v-for="(breadcrumb, index) in breadcrumbs" :key="index")
        a.breadcrumbs__link(href="#") {{ breadcrumb }}
        span.breadcrumbs__separator(v-if="index < breadcrumbs.length - 1") •
</template>

<script>
export default {
  props: {
    breadcrumbs: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
  color: #d1d1d1;
  display: flex;
  align-items: center;
  z-index: 100;
  font-size: 10px;
  line-height: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.3;
}

.breadcrumbs__list {
  display: flex;
  align-items: center;
  margin: 0;
}

.breadcrumbs__item {
  display: flex;
  align-items: center;
}

.breadcrumbs__link {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s, opacity 0.3s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: #ffffff;
      opacity: 1;
    }
  }
}

.breadcrumbs__separator {
  margin: 0 0.5em;
  position: relative;
  bottom: 1px;
}
</style>
