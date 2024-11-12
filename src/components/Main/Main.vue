<template lang="pug">
    main.main-container
      h1.visually-hidden Онлайн-магазин цветовых решений для ремонта поверхностей 
      Hero
    </template>

<script>
import Hero from "./Hero/Hero.vue";

export default {
  components: {
    Hero,
  },
};
</script>

<style scoped>
.main-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
