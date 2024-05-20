import { MetaProvider } from '@solidjs/meta';
import { Route, Router } from '@solidjs/router';
import type { Component } from 'solid-js';

import AppLayout from '#src/components/app-layout';
import Home from '#src/components/home';
import NotFound from '#src/components/not-found';
import Cart from '#src/features/cart/cart';
import Menu from '#src/features/menu/menu';
import Order from '#src/features/order/[id]';
import NewOrder from '#src/features/order/newOrder';
import menuData from './features/menu/menu.data';
import orderData from './features/order/[id].data';

const App: Component = () => {
  return (
    <MetaProvider>
      <Router root={AppLayout}>
        <Route path="/" component={Home} />
        <Route path="/menu" component={Menu} load={menuData} />
        <Route path="/cart" component={Cart} />
        <Route path="/order/new" component={NewOrder} />
        <Route path="/order/:id" component={Order} load={orderData} />
        <Route path="*" component={NotFound} />
      </Router>
    </MetaProvider>
  );
};

export default App;
