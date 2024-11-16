<template lang="pug">
    ul.cart-modal__list
      li.cart-modal__item(
        :class="{ 'cart-modal__item--removed': item.removed }"
        v-for="item in cartItems"
        :key="item.product.id"
      )
        img.cart-modal__item-image(:src="item.product.imageUrl", :alt="item.product.name")
        div.cart-modal__item-details
          h3.cart-modal__item-name 
            a.cart-modal__item-link {{ item.product.name }}
          p.cart-modal__item-price {{ item.product.price }} ₽
        div.cart-item__controls
          button.cart-item__control-button(:disabled="item.removed" @click="decreaseQuantity(item.product.id)") -
          span.cart-item__quantity {{ item.quantity }}
          button.cart-item__control-button(:disabled="item.removed" @click="increaseQuantity(item.product.id)") +
        div.cart-item__action
          button.cart-item__remove(
            v-if="!item.removed"
            @click="removeItem(item.product.id)"
          ) ✕
          div.cart-item__icon-container(v-if="item.removed" @click="restoreItem(item.product.id)")              
            span.visually-hidden восстановить
            svg.cart-item__icon(width="24" height="24")
              use(xlink:href="#icon-repeat")
        div.cart-item__overlay(v-if="item.removed")
    </template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
  },
  emits: [
    "decrease-quantity",
    "increase-quantity",
    "remove-item",
    "restore-item",
  ],
  setup(props, { emit }) {
    const decreaseQuantity = (productId) => {
      emit("decrease-quantity", productId);
    };

    const increaseQuantity = (productId) => {
      emit("increase-quantity", productId);
    };

    const removeItem = (productId) => {
      emit("remove-item", productId);
    };

    const restoreItem = (productId) => {
      emit("restore-item", productId);
    };

    return {
      decreaseQuantity,
      increaseQuantity,
      removeItem,
      restoreItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.cart-modal__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-modal__item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;

  &:first-child {
    border-top: 1px solid #f0f0f0;
  }
}

.cart-modal__item-image {
  width: 96px;
  height: 96px;
  object-fit: cover;
  margin-right: 15px;
}

.cart-modal__item-details {
  flex-grow: 1;
  min-width: 165px;
  margin-right: 3.23vw;

  @media (max-width: 530px) {
    min-width: 125px;
    margin-right: 0;
  }

  @media (max-width: 376px) {
    max-width: 145px;
  }
}

.cart-modal__item-name {
  font-weight: 500;
  margin: 0;
  color: #1f2020;
  font-size: 16px;
  font-weight: 300;
  line-height: 17.92px;
  letter-spacing: 0.02em;

  @media (max-width: 769px) {
    font-size: 12px;
  }
}

.cart-modal__item-link {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}

.cart-modal__item-price {
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  color: #1f2020;

  @media (max-width: 769px) {
    width: fit-content;
  }
}

.cart-item__controls {
  display: flex;
  align-items: center;
  gap: 17px;
  justify-content: center;
  margin-right: 37px;

  @media (max-width: 476px) {
    margin-right: 4px;
    flex-direction: column;
    gap: 8px;

    :nth-child(1) {
      order: 3;
    }

    :nth-child(2) {
      order: 2;
    }

    :nth-child(3) {
      order: 1;
    }
  }
}

.cart-item__control-button {
  width: 40px;
  height: 24px;
  background-color: #f2f2f2;
  border: none;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  margin: 0;
  border-radius: 4px;
  transition: background-color 0.15s;

  &:hover {
    background-color: #bbbbbb;
  }
}

.cart-item__quantity {
  font-size: 16px;
  line-height: 16px;
}

.cart-item__remove {
  background: none;
  border: none;
  font-size: 18px;
  color: #1f2020;
  cursor: pointer;
  opacity: 0.2;

  &:hover {
    opacity: 1;
  }
}

.cart-item__icon-container {
  cursor: pointer;
  margin-left: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-item__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  pointer-events: none;
}
</style>
