import { getCurrentQuantityById } from '../../store/cart';
import { CartItem as CartItemType } from '../../types/order';
import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './delete-item';
import UpdateItemQuantity from './update-item-quantity';

function CartItem(props: { item: CartItemType }) {
  return (
    <li class="py-3 sm:flex sm:items-center sm:justify-between">
      <p class="mb-1 sm:mb-0">
        {props.item.quantity}&times; {props.item.name}
      </p>
      <div class="flex items-center justify-between sm:gap-6">
        <p class="text-sm font-bold">{formatCurrency(props.item.totalPrice)}</p>
        <UpdateItemQuantity
          id={props.item.pizzaId}
          currentQuantity={getCurrentQuantityById(props.item.pizzaId).get()}
        />
        <DeleteItem id={props.item.pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
