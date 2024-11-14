<template lang="pug">
  li.product-card
    .product-card__image
      img(:src="product.imageUrl", :alt="product.name")
    .product-card__description  
      h3.product-card__title {{ product.name }}
      p.product-card__article Артикул: {{ product.sku }}
    .product-card__container
      p.product-card__price Цена: {{ product.price }} ₽
      button.product-card__add-to-cart(@click="addToCart", @mouseover="hover = true", @mouseleave="hover = false") +
</template>

<script>
import { ref } from "vue";
import { useCartStore } from "@/store/cartStore";

export default {
  props: ["product"],
  setup(props) {
    const cartStore = useCartStore();
    const hover = ref(false);
    const addToCart = () => {
      cartStore.addToCart(props.product);
    };

    return { addToCart, hover };
  },
};
</script>

<style lang="scss" scoped>
.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* Другие стили */
}

.product-card__description {
  margin: 0;
}

.product-card__title{
  font-size: 16px;
  font-weight: 300;
  line-height: 17.92px;
  letter-spacing: 0.02em;
  margin: 0;
}
.product-card__article {
  font-size: 16px;
  font-weight: 300;
  line-height: 17.92px;
  letter-spacing: 0.02em;
  margin: 0;
}

.product-card__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-card__price {
font-size: 16px;
font-weight: 600;
line-height: 16px;
}

.product-card__add-to-cart {
  display: none;
  // position: absolute;
  font-size: 20px;
  border: none;
  background-color: rgba(123, 184, 153, 1);
  padding: 6px 30px;
  border-radius: 8px;
  /* Позиционирование кнопки */
}


.product-card:hover .product-card__add-to-cart {
  display: block;
}
</style>