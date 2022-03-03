import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './views/Auth/Auth';
import Home from './views/Home/Home';
import Group from './views/Group/Group';
import UpdateProfile from './views/UpdateProfile/UpdateProfile';
import Header from './components/Header/Header';
import DisplayProfile from './components/DisplayProfile/DisplayProfile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './App.css'; /* Global CSS */

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/login">
          <Auth />
        </Route>

        <Route path="/register">
          <Auth isSigningUp />
        </Route>

        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>

        <PrivateRoute path="/create">
          <UpdateProfile isCreating />
        </PrivateRoute>

        <PrivateRoute path="/edit">
          <UpdateProfile />
        </PrivateRoute>

        <PrivateRoute path="/profile/:username">
          <DisplayProfile />
        </PrivateRoute>

        <PrivateRoute path="/group">
          <Group />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}
