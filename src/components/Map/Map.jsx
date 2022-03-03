import React from 'react';
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from 'react-map-gl';
import NavButton from '../NavButton/NavButton';
import styles from './Map.module.css';
import { useProfile } from '../../context/ProfileContext';
import { useGroup } from '../../context/GroupContext';
import { Link } from 'react-router-dom';

export default function Map({
  viewport,
  setViewport,
  setUserCoords,
  showPopup,
  setShowPopup,
  selectedUser,
  setSelectedUser,
}) {
  const { loading } = useProfile();
  const { group } = useGroup();

  if (loading && group.length < 1) return <h1>loading</h1>;
  return (
    <div className={styles.map}>
      <h1 className="text-slate-100">friends.map()</h1>
      <ReactMapGL
        {...viewport}
        reuseMaps
        style={{ position: 'relative', width: '100vw', height: '100vh' }}
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
        {group.map((user) => (
          <Marker
            key={user.username}
            longitude={user.coords.longitude}
            latitude={user.coords.latitude}
            anchor="bottom"
          >
            <button
              className="text-2xl"
              onClick={(e) => {
                e.preventDefault();
                setSelectedUser(user);
                setShowPopup(true);
              }}
            >
              {user.avatar}
            </button>
          </Marker>
        ))}
        {showPopup && selectedUser && (
          <Popup
            className="text-slate-800"
            longitude={selectedUser.coords.longitude}
            latitude={selectedUser.coords.latitude}
            anchor="top-right"
            focusAfterOpen
            closeButton={false}
            closeOnClick={false}
          >
            <Link
              className="font-bold"
              to={`/profile/${selectedUser.username}`}
            >
              {selectedUser.username}
            </Link>{' '}
            ({selectedUser.first_name})<p>{selectedUser.status}</p>
            <p>{selectedUser.updated_at}</p>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
