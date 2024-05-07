import { A } from '@solidjs/router';

import SearchOrder from '../features/order/search-order';
import Username from '../features/user/username';

export default function Header() {
  return (
    <header class="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <A class="tracking-widest" href="/">
        Fast React Pizza Company
      </A>
      <SearchOrder />
      <Username />
    </header>
  );
}
