import React from 'react';
import { render } from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import App from './App';
import { UserProvider } from './context/userContext';

import './style.css';
import { ProfileProvider } from './context/ProfileContext';

render(
  <React.StrictMode>
    <UserProvider>
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
