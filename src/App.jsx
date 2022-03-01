import { useState } from 'react';
import './App.css'; /* Global CSS */
import styles from './App.module.css'; /* CSS Modules */
import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
  Popup,
} from 'react-map-gl';

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 45.5472,
    longitude: -122.6417,
    zoom: 14,
  });
  const [userCoords, setUserCoords] = useState(null);
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div className={styles.map}>
      <h1 className="text-slate-100">friends.map()</h1>
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
        <NavigationControl />
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
        {showPopup && userCoords && (
          <Popup
            longitude={userCoords.longitude}
            latitude={userCoords.latitude}
            anchor="bottom-left"
            onClose={() => setShowPopup(false)}
          >
            <strong>Jordan</strong> <br />
            gone Phishin', 3.0 baby
            <br /> 11:11 PM
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
