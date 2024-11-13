<template lang="pug">
  article.product-card
    img(:src="product.imageUrl", :alt="product.name")
    h3 {{ product.name }}
    p Артикул: {{ product.sku }}
    p Цена: {{ product.price }} ₽
    button.add-to-cart(@click="addToCart", @mouseover="hover = true", @mouseleave="hover = false")
      | +
</template>

<script>
import { ref } from "vue";
import { useCatalogStore } from "@/store/store";

export default {
  props: ["product"],
  setup(props) {
    const catalogStore = useCatalogStore();
    const hover = ref(false);
    const addToCart = () => {
      catalogStore.addToCart(props.product);
    };

    return { addToCart, hover };
  },
};
</script>

<style lang="scss" scoped>
.product-card {
  position: relative;
  /* Другие стили */
}

.add-to-cart {
  display: none;
  position: absolute;
  /* Позиционирование кнопки */
}

.product-card:hover .add-to-cart {
  display: block;
}
</style>
