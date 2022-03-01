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
  const [userCoords, setUserCoords] = useState({});
  const [showPopup, setShowPopup] = useState(true);

  console.log('userCoords', userCoords);

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
        </div>
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
          showUserHeading
          onGeolocate={(e) =>
            setUserCoords({
              latitude: e.coords.latitude,
              longitude: e.coords.longitude,
            })
          }
        />
      </ReactMapGL>
    </div>
  );
}
