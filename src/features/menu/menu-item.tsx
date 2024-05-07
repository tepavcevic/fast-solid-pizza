import { useStore } from '@nanostores/solid';
import Button from '../../components/button';
import { formatCurrency } from '../../utils/helpers';
import { Product } from '../../types/products';
import { addToCart, getCurrentQuantityById } from '../../store/cart';
import DeleteItem from '../cart/delete-item';
import UpdateItemQuantity from '../cart/update-item-quantity';

function MenuItem({ pizza }: { pizza: Product }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useStore(getCurrentQuantityById(id));
  const isInCart = currentQuantity() > 0;

  const handleAddToCart = () => {
    const newCartItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };

    addToCart(newCartItem);
  };

  return (
    <li class="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        class={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div class="flex grow flex-col pt-0.5">
        <p class="font-medium">{name}</p>
        <p class="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div class="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p class="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p class="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {!soldOut && (
            <div class="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity id={id} currentQuantity={1} />
              <DeleteItem id={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
