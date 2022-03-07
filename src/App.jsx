import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './views/Auth/Auth';
import Home from './views/Home/Home';
import UpdateProfile from './views/UpdateProfile/UpdateProfile';
import Header from './components/Header/Header';
import Group from './components/Group/Group';
import NoMatch from './components/NoMatch/NoMatch';
import DisplayProfile from './components/DisplayProfile/DisplayProfile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './App.css'; /* Global CSS */
import { useUser } from './context/UserContext';

export default function App() {
  const { user } = useUser();
  return (
    <div className="bg-map-wide bg-cover h-screen font-sans text-dark">
      <BrowserRouter>
        {user.id ? <Header /> : <Header hideButton />}
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

          <PrivateRoute path="*">
            <NoMatch />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
