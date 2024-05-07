import { useStore } from '@nanostores/solid';

import MenuItem from './menu-item';
import { Product } from '../../types/products';
import { menu as storeMenu } from '../../store/menu';

function Menu() {
  const menu = useStore(storeMenu)

  return (
    <ul class="divide-y divide-stone-200 px-2">
      {menu().map((pizza: Product) => (
        <MenuItem pizza={pizza} />
      ))}
    </ul>
  );
}

export default Menu;
