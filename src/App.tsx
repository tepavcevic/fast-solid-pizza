import type { Component } from 'solid-js';
import { Route, Router } from '@solidjs/router';

import AppLayout from './components/app-layout';
import Home from './components/home';
import Menu from './features/menu/menu';
import menuData from './features/menu/menu.data';
import Cart from './features/cart/cart';
import Order from './features/order/[orderId]';
import orderData from './features/order/[orderId].data';
import NewOrder from './features/order/newOrder';

const App: Component = () => {
  return (
    <Router root={AppLayout}>
      <Route path="/" component={Home} />
      <Route path="/menu" component={Menu} load={menuData} />
      <Route path="/cart" component={Cart} />
      <Route path="/order/new" component={NewOrder} />
      <Route path="/order:orderId" component={Order} load={orderData} />
      <Route path="*" />
    </Router>
  );
};

export default App;
