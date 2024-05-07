import type { Component } from 'solid-js';
import { Route, Router } from '@solidjs/router';
import AppLayout from './components/app-layout';
import Home from './components/home';
import Menu from './features/menu/menu';

const App: Component = () => {
  return (
    <Router root={AppLayout}>
      <Route path="/" component={Home} />
      <Route path="/menu" component={Menu} />
      <Route path="*" />
    </Router>
  );
};

export default App;
