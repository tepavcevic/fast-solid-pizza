import type { Component } from 'solid-js';
import { Route, Router } from '@solidjs/router';

import AppLayout from './components/app-layout';
import Home from './components/home';
import Menu from './features/menu/menu';
import menuData from './features/menu/menu.data';
import Cart from './features/cart/cart';

const App: Component = () => {
  return (
    <Router root={AppLayout}>
      <Route path="/" component={Home} />
      <Route path="/menu" component={Menu} load={menuData} />
      <Route path="/cart" component={Cart} />
      <Route path="*" />
    </Router>
  );
};

export default App;
