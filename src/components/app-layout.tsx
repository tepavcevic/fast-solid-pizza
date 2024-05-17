import { ParentComponent, Show } from 'solid-js';
import { Title } from '@solidjs/meta';
import { useIsRouting } from '@solidjs/router';

import CartOverview from '../features/cart/cart-overview';
import Header from './header';
import Loader from './loader';

const Index: ParentComponent = (props) => {
  const isRouting = useIsRouting();
  return (
    <>
      <Title>Fast Solid Pizza Co.</Title>
      <div class="grid h-screen grid-rows-[auto_1fr_auto]">
        <Header />
        <div class="overflow-auto">
          <Show when={!isRouting()} fallback={<Loader />}>
            <main class="mx-auto max-w-3xl">{props.children}</main>
          </Show>
        </div>

        <CartOverview />
      </div>
    </>
  );
};

export default Index;
