import { CartItem } from '#src/types/order';
import { formatCurrency } from '#src/utils/helpers';

function OrderItem(props: {
  item: CartItem;
  isLoadingIngredients: boolean;
  ingredients?: string[];
}) {
  return (
    <li class="space-y-1 py-3  ">
      <div class="flex items-center justify-between gap-4 text-sm">
        <p>
          <span class="font-bold">{props.item.quantity}&times;</span>{' '}
          {props.item.name}
        </p>
        <p class="font-bold">{formatCurrency(props.item.totalPrice)}</p>
      </div>
      <p class="text-sm capitalize italic text-stone-500">
        {props.isLoadingIngredients
          ? 'Loading ingredients...'
          : props.ingredients?.join(', ')}
      </p>
    </li>
  );
}

export default OrderItem;
