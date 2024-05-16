import { Params, createAsync } from '@solidjs/router';
import { For, Show } from 'solid-js';
import Loader from '../../components/loader';
import Button from '../../components/button';
import OrderItem from '../../features/order/order-item';
import { getMenu, getOrder } from '../../services/apiRestaurant';
import { CartItem as CartItemType } from '../../types/order';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';

// const updatePriority = action(async (data: { orderId: string }) => {
//   // eslint-disable-next-line @typescript-eslint/no-throw-literal
//   if (!data.orderId) throw redirect('/menu');

//   const updateData = { priority: true };
//   await updateOrder(data.orderId, updateData);
//   reload({ revalidate: getOrder.keyFor(data.orderId) });
// });

function Order(props: { params: Params }) {
  const menu = createAsync(() => getMenu());

  const order = createAsync(() => getOrder(props.params.id), {
    name: 'orderView',
  });

  // const priority = fetcher.formData
  //   ? fetcher.formData.get('priority') === 'true'
  //   : order.priority;

  const isMakingPriority = false;

  // async function handleMakePriority() {
  //   const submitPriority = useAction(updatePriority);
  //   await submitPriority({ orderId: props.params.orderId });
  // }

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  return (
    <Show when={order()} fallback={<Loader />}>
      {(orderView) => (
        <div class="space-y-8 px-4 py-6">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h2 class="text-xl font-semibold">
              Order #{orderView().id} status
            </h2>

            <div class="space-x-2">
              <Show when={orderView().priority}>
                <span class="rounded-full bg-red-500 p-1 text-sm font-semibold uppercase tracking-wide text-red-50">
                  Priority
                </span>
              </Show>
              <span class="rounded-full bg-green-500 p-1 text-sm font-semibold uppercase tracking-wide text-green-50">
                {orderView().status} order
              </span>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
            <p class="font-medium">
              {calcMinutesLeft(orderView().estimatedDelivery) >= 0
                ? `Only ${calcMinutesLeft(orderView().estimatedDelivery)} minutes left 😃`
                : 'Order should have arrived'}
            </p>
            <p class="text-xs text-stone-500">
              (Estimated delivery: {formatDate(orderView().estimatedDelivery)})
            </p>
          </div>

          <ul class="divide-y divide-stone-200 border-b border-t">
            <For each={orderView().cart}>
              {(item: CartItemType) => (
                <OrderItem
                  item={item}
                  isLoadingIngredients={!menu()}
                  ingredients={
                    menu()?.find(
                      (element: { id: number }) => element.id === item.pizzaId
                    )?.ingredients
                  }
                />
              )}
            </For>
          </ul>

          <div class="space-y-2 bg-stone-200 px-6 py-5">
            <p class="text-sm font-medium text-stone-600">
              Price pizza: {formatCurrency(orderView().orderPrice)}
            </p>
            <Show when={orderView().priority}>
              <p class="text-sm font-medium text-stone-600">
                Price priority: {formatCurrency(orderView().priorityPrice)}
              </p>
            </Show>
            <p class="font-bold">
              To pay on delivery:{' '}
              {formatCurrency(
                orderView().orderPrice + orderView().priorityPrice
              )}
            </p>
          </div>

          <Show when={!orderView().priority}>
            <div class="text-end">
              <Button variant="primary" disabled={isMakingPriority}>
                {isMakingPriority ? 'Making Priority...' : 'Make Priority'}
              </Button>
            </div>
          </Show>
        </div>
      )}
    </Show>
  );
}

export default Order;
