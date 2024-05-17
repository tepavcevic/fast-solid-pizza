import { MetaProvider } from '@solidjs/meta';
import { Route, Router } from '@solidjs/router';
import type { Component } from 'solid-js';

import AppLayout from './components/app-layout';
import Home from './components/home';
import NotFound from './components/not-found';
import Cart from './features/cart/cart';
import Menu from './features/menu/menu';
import menuData from './features/menu/menu.data';
import Order from './features/order/[id]';
import orderData from './features/order/[id].data';
import NewOrder from './features/order/newOrder';

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
