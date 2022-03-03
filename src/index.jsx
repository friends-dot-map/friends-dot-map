import React from 'react';
import { render } from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import App from './App';
import { UserProvider } from './context/userContext';

import './style.css';
import { ProfileProvider } from './context/ProfileContext';
import { GroupProvider } from './context/groupContext';

render(
  <React.StrictMode>
    <UserProvider>
      <ProfileProvider>
        <GroupProvider>
          <App />
        </GroupProvider>
      </ProfileProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
