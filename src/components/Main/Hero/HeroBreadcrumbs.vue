<template lang="pug">
  nav.hero__breadcrumbs
    ul.hero__breadcrumbs-list
      li.hero__breadcrumbs-item(v-for="(breadcrumb, index) in breadcrumbs" :key="index")
        a.hero__breadcrumbs-link(href="#") {{ breadcrumb }}
        span.hero__separator(v-if="index < breadcrumbs.length - 1") •
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
.hero__breadcrumbs {
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

.hero__breadcrumbs-list {
  display: flex;
  gap: 0.5em;
  list-style: none;
  padding: 0;
  margin: 0;
}

.hero__breadcrumbs-item {
  display: flex;
  align-items: center;
}

.hero__breadcrumbs-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #ffffff;
  }
}

.hero__separator {
  margin: 0 0.5em;
}
</style>
