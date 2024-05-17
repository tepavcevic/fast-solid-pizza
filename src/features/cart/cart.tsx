import { For, Show } from 'solid-js';
import { useStore } from '@nanostores/solid';
import { Title } from '@solidjs/meta';

import { cart, clearCart } from '../../store/cart';
import { user } from '../../store/users';
import Button from '../../components/button';
import LinkButton from '../../components/link-button';
import CartItem from '../../features/cart/cart-item';
import EmptyCart from '../../features/cart/empty-cart';
import { CartItem as CartItemType } from '../../types/order';

function Cart() {
  const storedUser = useStore(user);
  const storedCart = useStore(cart);

  const handleClearCart = () => clearCart();

  return (
    <>
      <Title>Cart | Fast Solid Pizza Co.</Title>
      <Show when={storedCart().length > 0} fallback={<EmptyCart />}>
        <div class="px-4 py-3">
          <LinkButton to="/menu">&larr; Back to menu</LinkButton>

          <h2 class="mt-7 text-xl font-semibold">
            Your cart, {storedUser().username}
          </h2>

          <ul class="mt-3 divide-y divide-stone-200 border-b">
            <For each={storedCart()}>
              {(item: CartItemType) => <CartItem item={item} />}
            </For>
          </ul>

          <div class="mt-10 space-x-2">
            <Button variant="primary" to="/order/new">
              Order pizzas
            </Button>

            <Button variant="secondary" onClick={handleClearCart}>
              Clear cart
            </Button>
          </div>
        </div>
      </Show>
    </>
  );
}

export default Cart;
