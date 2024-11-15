<template lang="pug">
  li.product-card
    a.product-card__link(href='#')
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
  justify-content: space-between;
  gap: 16px;
  padding: 8px 8px 0 8px;
  border-radius: 8px;

  &::after {
    content: "";
    // position: absolute;
    // bottom: -22px;
    height: 1px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}

.product-card__image {
  height: 278px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}

.product-card__description {
  margin: 0;
  padding-bottom: 8px;
}

.product-card__title {
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
  min-height: 35px;
}

.product-card__price {
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  margin: 0;
}

.product-card__add-to-cart {
  display: none;
  font-size: 24px;
  border: none;
  background-color: rgba(123, 184, 153, 1);
  padding: 2px 30px;
  border-radius: 8px;
  cursor: pointer;

  @media (max-width: 769px) {
    display: block;
    font-size: 20px;
    padding: 4px 14px;
    background-color: #f2f2f2;
  }
}

.product-card:hover .product-card__add-to-cart {
  display: block;
}
</style>
