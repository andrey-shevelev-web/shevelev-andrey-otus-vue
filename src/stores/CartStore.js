import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { CART_DEC_QUANTITY } from '@/constants';
import { useProductStore } from '@/stores/ProductStore';

export const useCartStore = defineStore('cartStore', () => {
  const productStore = useProductStore();

  const cart = reactive([]);

  const clearCart = () => {
    cart.splice(0, cart.length);
  };

  const findCartItemByProductId = productId => {
    return cart.find(o => o.productId == productId);
  };

  const addProductToCart = productId => {
    const foundCartItem = findCartItemByProductId(productId);
    if (foundCartItem) {
      foundCartItem.quantity += 1;
    } else {
      const foundProduct = productStore.products.find(o => o.id == productId);
      if (!foundProduct) return;

      const newCartItem = {
        id: uuidv4(),
        productId,
        image: foundProduct.image,
        title: foundProduct.title,
        price: foundProduct.price,
        quantity: 1
      };

      cart.push(newCartItem);
    }
  };

  const changeCartItemQuantity = (productId, action) => {
    const foundCartItem = cart.find(o => o.productId == productId);

    if (foundCartItem) {
      switch (action) {
        case CART_DEC_QUANTITY:
          if (foundCartItem.quantity > 1) foundCartItem.quantity -= 1;
          break;
        default:
          foundCartItem.quantity += 1;
      }
    }
  };

  const removeCartItem = productId => {
    const foundCartItemIdx = cart.findIndex(o => o.productId == productId);
    cart.splice(foundCartItemIdx, 1);
  };

  const getCartItemAmount = productId => {
    const foundCartItem = findCartItemByProductId(productId);
    if (foundCartItem) {
      return (foundCartItem.price * foundCartItem.quantity).toFixed(2);
    }
    return 0;
  };

  const cartTotalAmount = computed(() => {
    const total = cart.reduce((acc, o) => {
      return acc + o.price * o.quantity;
    }, 0);

    return total.toFixed(2);
  });

  const cartTotalQuantity = computed(() => {
    const total = cart.reduce((acc, o) => {
      return acc + o.quantity;
    }, 0);

    return total;
  });

  return {
    cart,
    clearCart,
    addProductToCart,
    changeCartItemQuantity,
    removeCartItem,
    getCartItemAmount,
    cartTotalAmount,
    cartTotalQuantity
  };
});
