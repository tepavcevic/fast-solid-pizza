import { useStore } from '@nanostores/solid';
import {
  Params,
  action,
  createAsync,
  redirect,
  reload,
  useAction,
} from '@solidjs/router';
import { For } from 'solid-js';
import { menu as storeMenu } from '../../store/menu';
import Button from '../../components/button';
import OrderItem from '../../features/order/order-item';
import { getOrder, updateOrder } from '../../services/apiRestaurant';
import { CartItem as CartItemType } from '../../types/order';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';

const updatePriority = action(async (data: { orderId: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  if (!data.orderId) throw redirect('/menu');

  const updateData = { priority: true };
  await updateOrder(data.orderId, updateData);
  reload({ revalidate: getOrder.keyFor(data.orderId) });
});

function Order(props: { params: Params }) {
  const menu = useStore(storeMenu);
  const order = createAsync(getOrder(props.params.orderId), { name: 'order' });

  const priority = fetcher.formData
    ? fetcher.formData.get('priority') === 'true'
    : order.priority;

  const isMakingPriority = fetcher.state === 'submitting';

  async function handleMakePriority() {
    const submitPriority = useAction(updatePriority);
    await submitPriority({ orderId: props.params.orderId });
  }

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const deliveryIn = calcMinutesLeft(order().estimatedDelivery);

  return (
    <div class="space-y-8 px-4 py-6">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h2 class="text-xl font-semibold">Order #{order().id} status</h2>

        <div class="space-x-2">
          {priority && (
            <span class="rounded-full bg-red-500 p-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span class="rounded-full bg-green-500 p-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {order().status} order
          </span>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p class="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(order().estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p class="text-xs text-stone-500">
          (Estimated delivery: {formatDate(order().estimatedDelivery)})
        </p>
      </div>

      <ul class="divide-y divide-stone-200 border-b border-t">
        <For each={order().cart}>
          {(item: CartItemType) => (
            <OrderItem
              item={item}
              isLoadingIngredients={!menu()}
              ingredients={
                menu().find(
                  (element: { id: number }) => element.id === item.pizzaId
                )?.ingredients
              }
            />
          )}
        </For>
      </ul>

      <div class="space-y-2 bg-stone-200 px-6 py-5">
        <p class="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(order().orderPrice)}
        </p>
        {priority && (
          <p class="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(order().priorityPrice)}
          </p>
        )}
        <p class="font-bold">
          To pay on delivery:{' '}
          {formatCurrency(order().orderPrice + order().priorityPrice)}
        </p>
      </div>

      {!priority && (
        <div class="text-end">
          <Button type="primary" disabled={isMakingPriority}>
            {isMakingPriority ? 'Making Priority...' : 'Make Priority'}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Order;
