import React from 'react';
import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
  Popup,
} from 'react-map-gl';
import styles from './Map.module.css';

export default function Map({
  viewport,
  setViewport,
  userCoords,
  setUserCoords,
  showPopup,
  setShowPopup,
}) {

  
  return (
    <div className={styles.map}>
      <h1 className="text-slate-100">friends.map()</h1>
      <ReactMapGL
        {...viewport}
        reuseMaps
        style={{ position: 'relative', width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxAccessToken={process.env.MapboxAccessToken}
        onMove={e => setViewport(e.viewState)}
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
