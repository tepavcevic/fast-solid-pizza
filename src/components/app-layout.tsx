import { ParentComponent } from 'solid-js';

import CartOverview from '../features/cart/cart-overview';
import Header from './header';

const Index: ParentComponent = (props) => {
  return (
    <div class="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <div class="overflow-auto">
        <main class="mx-auto max-w-3xl">{props.children}</main>
      </div>

      <CartOverview />
    </div>
  );
};

export default Index;
