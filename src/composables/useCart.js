import { computed } from "vue";
import { useCartStore } from "@/store/cartStore";

export function useCart() {
  const cartStore = useCartStore();

  const cartItemCount = computed(() => cartStore.cartItemCount);
  const cartTotalPrice = computed(() => cartStore.cartTotalPrice);
  const cartItems = computed(() => cartStore.cartItemsList);

  const clearCart = () => {
    cartStore.clearCart();
  };

  const decreaseQuantity = (productId) => {
    const cartItem = cartStore.cartItems[productId];
    if (cartItem) {
      const currentQuantity = cartItem.quantity;
      cartStore.updateCartItemQuantity(productId, currentQuantity - 1);
    }
  };

  const increaseQuantity = (productId) => {
    const cartItem = cartStore.cartItems[productId];
    if (cartItem && !cartItem.removed) {
      const currentQuantity = cartItem.quantity;
      cartStore.updateCartItemQuantity(productId, currentQuantity + 1);
    }
  };

  const removeItem = (productId) => {
    cartStore.toggleRemovedStatus(productId);
  };

  const restoreItem = (productId) => {
    cartStore.toggleRemovedStatus(productId);
  };

  const deleteItem = (productId) => {
    cartStore.removeFromCart(productId);
  };

  const checkout = () => {
    alert("Заказ оформлен");
    cartStore.clearCart();
  };

  return {
    cartItemCount,
    cartTotalPrice,
    cartItems,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    removeItem,
    restoreItem,
    checkout,
    deleteItem,
  };
}
