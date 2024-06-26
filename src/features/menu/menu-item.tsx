import { useStore } from '@nanostores/solid';
import { Show, createEffect, createSignal } from 'solid-js';

import Button from '#src/components/button';
import DeleteItem from '#src/features/cart/delete-item';
import UpdateItemQuantity from '#src/features/cart/update-item-quantity';
import { addToCart, getCurrentQuantityById } from '#src/store/cart';
import { Product } from '#src/types/products';
import { formatCurrency } from '#src/utils/helpers';

function MenuItem(props: { pizza: Product }) {
  const [currentQuantity, setCurrentQuantity] = createSignal(0);
  createEffect(() => {
    const currentQ = useStore(getCurrentQuantityById(props.pizza.id));
    setCurrentQuantity(currentQ());
  });

  const handleAddToCart = () => {
    const newCartItem = {
      pizzaId: props.pizza.id,
      name: props.pizza.name,
      unitPrice: props.pizza.unitPrice,
      quantity: 1,
      totalPrice: props.pizza.unitPrice * 1,
    };

    addToCart(newCartItem);
  };

  return (
    <li class="flex gap-4 py-2">
      <img
        src={props.pizza.imageUrl}
        alt={props.pizza.name}
        class={`h-24 ${props.pizza.soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div class="flex grow flex-col pt-0.5">
        <p class="font-medium">{props.pizza.name}</p>
        <p class="text-sm capitalize italic text-stone-500">
          {props.pizza.ingredients.join(', ')}
        </p>
        <div class="mt-auto flex items-center justify-between">
          <Show
            when={props.pizza.soldOut}
            fallback={
              <p class="text-sm">{formatCurrency(props.pizza.unitPrice)}</p>
            }
          >
            <p class="text-sm font-medium uppercase text-stone-500">Sold out</p>
          </Show>

          <Show when={!props.pizza.soldOut}>
            <Show
              when={currentQuantity() > 0}
              fallback={
                <Button variant="small" onClick={handleAddToCart}>
                  Add to cart
                </Button>
              }
            >
              <div class="flex items-center gap-3 sm:gap-8">
                <UpdateItemQuantity
                  id={props.pizza.id}
                  currentQuantity={currentQuantity()}
                />
                <DeleteItem id={props.pizza.id} />
              </div>
            </Show>
          </Show>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
