import './App.css'; /* Global CSS */
import Home from './views/Home/Home';
import Auth from './views/Auth/Auth';
import Group from './views/Group/Group';
import Header from './components/Header/Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UpdateProfile from './views/UpdateProfile/UpdateProfile';
import DisplayProfile from './components/DisplayProfile/DisplayProfile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>

        <Route path="/login">
          <Auth />
        </Route>

        <Route path="/register">
          <Auth isSigningUp />
        </Route>

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
