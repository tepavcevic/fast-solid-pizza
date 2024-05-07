import { For } from 'solid-js';
import { useStore } from '@nanostores/solid';

import MenuItem from './menu-item';
import { Product } from '../../types/products';
import { menu as storeMenu } from '../../store/menu';

function Menu() {
  const menu = useStore(storeMenu);

  return (
    <ul class="divide-y divide-stone-200 px-2">
      <For each={menu()}>{(pizza: Product) => <MenuItem pizza={pizza} />}</For>
    </ul>
  );
}

export default Menu;
