<template lang="pug">
    div.catalog
      h1 Каталог товаров
      button(@click="addToCart({ id: 1, name: 'Товар 1' })") Добавить в корзину
    </template>

<script>
import { useCatalogStore } from "../store/store.js";
export default {
  name: "Catalog",
  // любые данные или методы
};

</script>

<style scoped>

</style>
