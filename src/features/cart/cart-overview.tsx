import { A } from '@solidjs/router';
import { useStore } from '@nanostores/solid';
import { Show } from 'solid-js';
import { formatCurrency } from '../../utils/helpers';
import { getTotalCartPrice, getTotalCartQuantity } from '../../store/cart';

function CartOverview() {
  const totalCartPrice = useStore(getTotalCartPrice);
  const totalCartQuantity = useStore(getTotalCartQuantity);

  return (
    <Show when={totalCartQuantity() > 0}>
      <div class="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase sm:px-6 md:text-base">
        <p class="space-x-4 font-semibold text-stone-300 sm:space-x-6">
          <span>{totalCartQuantity() || 0} pizza(s)</span>
          <span>{formatCurrency(totalCartPrice()) || 0}</span>
        </p>
        <A class="text-stone-300" href="/cart">
          Open cart &rarr;
        </A>
      </div>
    </Show>
  );
}

export default CartOverview;
