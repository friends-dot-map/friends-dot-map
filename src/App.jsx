import { useState } from 'react';
import './App.css'; /* Global CSS */
import styles from './App.module.css'; /* CSS Modules */
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 45.5472,
    longitude: -122.6417,
    width: '100vw',
    height: '100vh',
    zoom: 14,
  });

  return (
    <div className={styles.map}>
      <ReactMapGL
        {...viewport}
        reuseMaps
        style={{ position: 'relative', width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxAccessToken={process.env.MapboxAccessToken}
        onMove={(viewport) => {
          setViewport(viewport);
        }}
      >
        <div className={styles.nav}>
          <NavigationControl />
          <GeolocateControl trackUserLocation showUserHeading />
        </div>
      </ReactMapGL>
    </div>
  );
}
