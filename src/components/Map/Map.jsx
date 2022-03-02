import React from 'react';
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from 'react-map-gl';
import NavButton from '../NavButton/NavButton';
import styles from './Map.module.css';

const otherUsers = [
  {
    username: 'Stella',
    avatar: '☕',
    status: 'why is this coffee shop SO busy',
    latitude: 45.415087,
    longitude: -122.58135,
  },
  {
    username: 'Bailey',
    avatar: '😭',
    status: 'these cajun tots are WHACK',
    latitude: 45.51226,
    longitude: -122.64917,
  },
  {
    username: 'Violet',
    avatar: '💃',
    status: 'party at mount tabor',
    latitude: 45.518,
    longitude: -122.5948,
  },
];

export default function Map({
  viewport,
  setViewport,
  userCoords,
  setUserCoords,
  showPopup,
  setShowPopup,
  selectedUser,
  setSelectedUser,
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
        onMove={(e) => setViewport(e.viewState)}
      >
        <NavButton className="fixed right-0" />

        <NavigationControl />
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          showUserHeading
          onGeolocate={(e) =>
            setUserCoords({
              latitude: e.coords.latitude,
              longitude: e.coords.longitude,
            })
          }
        />
        {otherUsers.map((user) => (
          <div key={user.username}>
            <Marker
              longitude={user.longitude}
              latitude={user.latitude}
              anchor="bottom"
            >
              <button
                onClick={() => {
                  setSelectedUser(user);
                }}
              >
                {user.avatar}
              </button>
            </Marker>
            {selectedUser && (
              <Popup
                longitude={user.longitude}
                latitude={user.latitude}
                anchor="top-right"
                onClose={() => setSelectedUser(null)}
              >
                <strong>{user.username}</strong> <br />
                {user.status}
                <br /> 2:40 PM
              </Popup>
            )}
          </div>
        ))}

        {/* {showPopup && userCoords && (
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
        )} */}
      </ReactMapGL>
    </div>
  );
}
