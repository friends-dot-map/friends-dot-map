import React from 'react';
import { render } from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import App from './App';

import './style.css';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
