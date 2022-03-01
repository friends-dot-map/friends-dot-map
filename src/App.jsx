import { useState } from 'react';
import './App.css'; /* Global CSS */
import styles from './App.module.css'; /* CSS Modules */
import ReactMapGL, { NavigationControl } from 'react-map-gl';

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 45.5472,
    longitude: -122.6417,
    width: '100vw',
    height: '100vh',
    zoom: 14,
  });

  console.log('viewport', viewport);

  return (
    <div className={styles.map}>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={process.env.MapboxAccessToken}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        <div className={styles.nav}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    </div>
  );
}
