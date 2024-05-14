import { For, Suspense } from 'solid-js';
import { useStore } from '@nanostores/solid';

import Loader from '../../components/loader';
import { menu as storeMenu } from '../../store/menu';
import { Product } from '../../types/products';
import MenuItem from './menu-item';

function Menu() {
  const menu = useStore(storeMenu);

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
