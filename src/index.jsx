import React from 'react';
import { render } from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import App from './App';
import { UserProvider } from './context/userContext';

import './style.css';

render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
