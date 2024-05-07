import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './delete-item';
import UpdateItemQuantity from './update-item-quantity';
import { getCurrentQuantityById } from '../../store/cart';
import { CartItem as CartItemType } from '../../types/order';
import { useStore } from '@nanostores/solid';

function CartItem({ item }: { item: CartItemType }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useStore(getCurrentQuantityById(pizzaId));

  return (
    <li class="py-3 sm:flex sm:items-center sm:justify-between">
      <p class="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div class="flex items-center justify-between sm:gap-6">
        <p class="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity id={pizzaId} currentQuantity={currentQuantity()} />
        <DeleteItem id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
