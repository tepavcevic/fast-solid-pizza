import { For, Suspense } from 'solid-js';
import { Title } from '@solidjs/meta';

import { createAsyncStore } from '@solidjs/router';
import { getMenu } from '../../services/apiRestaurant';
import Loader from '../../components/loader';
import { Product } from '../../types/products';
import MenuItem from './menu-item';

function Menu() {
  const menu = createAsyncStore(() => getMenu(), {
    initialValue: [],
    name: 'menu',
  });

  return (
    <>
      <Title>Menu | Fast Solid Pizza Co.</Title>
      <Suspense fallback={<Loader />}>
        <ul class="divide-y divide-stone-200 px-2">
          <For each={menu()}>
            {(pizza: Product) => <MenuItem pizza={pizza} />}
          </For>
        </ul>
      </Suspense>
    </>
  );
}

export default Menu;
