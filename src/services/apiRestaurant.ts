import { cache } from '@solidjs/router';
import { Order } from '../types/order';
import { Product } from '../types/products';

const API_URL = 'https://react-fast-pizza-api.onrender.com/api';

export const getMenu = cache(async () => {
  const res = await fetch(`${API_URL}/menu`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error('Failed getting menu');

  const { data } = (await res.json()) as { data: Array<Product> };
  return data;
}, 'menu');

export const getOrder = cache(async (id: string): Promise<Order> => {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = (await res.json()) as { data: Order };
  return data;
}, 'order');

export async function createOrder(newOrder: Order): Promise<Product> {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    const { data } = (await res.json()) as { data: Product };
    return data;
  } catch {
    throw Error('Failed creating your order');
  }
}

export async function updateOrder(
  id: string,
  updateObj: Record<string, unknown>
) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error('Failed updating your order');
  }
}
