import { For, Suspense } from 'solid-js';
import { createAsync } from '@solidjs/router';

import MenuItem from './menu-item';
import { Product } from '../../types/products';
import Loader from '../../components/loader';
import { getMenu } from '../../services/apiRestaurant';

function Menu() {
  const menu = createAsync(() => getMenu(), { name: 'menu' });
  return (
    <Suspense fallback={<Loader />}>
      <ul class="divide-y divide-stone-200 px-2">
        <For each={menu()}>
          {(pizza: Product) => <MenuItem pizza={pizza} />}
        </For>
      </ul>
    </Suspense>
  );
}

export default Menu;
