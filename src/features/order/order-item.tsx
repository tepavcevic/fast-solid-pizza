import { CartItem } from '../../types/order';
import { formatCurrency } from '../../utils/helpers';

function OrderItem({
  item,
  isLoadingIngredients,
  ingredients,
}: {
  item: CartItem;
  isLoadingIngredients: boolean;
  ingredients?: string[];
}) {
  const { quantity, name, totalPrice } = item;

  return (
    <li class="space-y-1 py-3  ">
      <div class="flex items-center justify-between gap-4 text-sm">
        <p>
          <span class="font-bold">{quantity}&times;</span> {name}
        </p>
        <p class="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p class="text-sm capitalize italic text-stone-500">
        {isLoadingIngredients
          ? 'Loading ingredients...'
          : ingredients?.join(', ')}
      </p>
    </li>
  );
}

export default OrderItem;
