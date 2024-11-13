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
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #d1d1d1;
  font-size: 1em;
  display: flex;
  align-items: center;
  z-index: 100;
}

.breadcrumbs__list {
  display: flex;
  gap: 0.5em;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumbs__item {
  display: flex;
  align-items: center;
}

.breadcrumbs__link {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #ffffff;
  }
}

.breadcrumbs__separator {
  margin: 0 0.5em;
}
</style>
