import { atom, computed } from 'nanostores';
import { CartItem } from '../types/order';

export const cart = atom<Array<CartItem>>([]);

export const addToCart = (item: CartItem) => {
  cart.set([...cart.get(), item]);
};
export const removeFromCart = (id: number) => {
  cart.set(cart.get().filter((cartItem) => cartItem.pizzaId !== id));
};
export const clearCart = () => {
  cart.set([]);
};
export const increaseCartItemQuantity = (id: number) => {
  const itemToIncrease = cart.get().find((cartItem) => cartItem.pizzaId === id);

  if (!itemToIncrease) return;

  cart.set(
    cart.get().map((cartItem) => {
      if (cartItem.pizzaId === itemToIncrease.pizzaId) {
        return {
          ...cartItem,
          quantity: cartItem.quantity + 1,
          totalPrice: cartItem.unitPrice * cartItem.quantity,
        };
      }
      return cartItem;
    })
  );
};
export const decreaseCartItemQuantity = (id: number) => {
  const itemToDecrease = cart.get().find((cartItem) => cartItem.pizzaId === id);

  if (!itemToDecrease) return;

  cart.set(
    cart.get().map((cartItem) => {
      if (cartItem.pizzaId === itemToDecrease.pizzaId) {
        return {
          ...cartItem,
          quantity: cartItem.quantity - 1,
          totalPrice: cartItem.unitPrice * cartItem.quantity,
        };
      }
      return cartItem;
    })
  );

  if (cart.get().filter((cartItem) => cartItem.quantity > 0).length === 0) {
    clearCart();
  }
};

export const getTotalCartQuantity = computed(cart, (storeCart) =>
  storeCart.reduce((acc, curr) => acc + curr.quantity, 0)
);
export const getTotalCartPrice = computed(cart, (storeCart) =>
  storeCart.reduce((acc, curr) => acc + curr.totalPrice, 0)
);
export const getCurrentQuantityById = (id: number) =>
  computed(
    cart,
    (storeCart) => storeCart.find((item) => item.pizzaId === id)?.quantity ?? 0
  );
