import { atom, onMount, task } from 'nanostores';

import { Product } from '../types/products';
import { getMenu } from '../services/apiRestaurant';

// eslint-disable-next-line import/prefer-default-export
export const menu = atom<Array<Product>>([]);

onMount(menu, () => {
  // eslint-disable-next-line no-void
  void task(async () => menu.set(await getMenu()));
});
