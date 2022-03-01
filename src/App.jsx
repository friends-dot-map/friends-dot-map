import './App.css'; /* Global CSS */
import Home from './views/Home/Home';
import Auth from './views/Auth/Auth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/login">
          <Auth />
        </Route>

        <Route path="/register">
          <Auth isSigningUp />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
