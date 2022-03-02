import './App.css'; /* Global CSS */
import Home from './views/Home/Home';
import Auth from './views/Auth/Auth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UpdateProfile from './views/UpdateProfile/UpdateProfile';

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

        <Route path="/create">
          <UpdateProfile isCreating />
        </Route>

        <Route path="/edit">
          <UpdateProfile />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}
