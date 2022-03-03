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
import { useGroup } from '../../context/groupContext';

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
  const { profile, loading, setLoading } = useProfile();
  const { group } = useGroup();
  console.log(group);
  if (loading && group.length < 1) return <h1>loading</h1>;
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
        <Marker
          longitude={userCoords.longitude}
          latitude={userCoords.latitude}
          anchor="bottom"
        >
          <button
            onClick={() => {
              setSelectedUser(user);
            }}
          >
            {profile.avatar}
          </button>
        </Marker>
        <Popup
          className="text-slate-800"
          longitude={userCoords.longitude}
          latitude={userCoords.latitude}
          anchor="top-right"
        >
          <strong>{profile.username}</strong> <br />
          {profile.status}
          <br /> 4:20 PM
        </Popup>
        {group.map((user) => (
          <div key={user.username}>
            <Marker
              longitude={user.coords.longitude}
              latitude={user.coords.latitude}
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
            <Popup
              className="text-slate-800"
              longitude={user.coords.longitude}
              latitude={user.coords.latitude}
              anchor="top-right"
            >
              <strong>{user.username}</strong> <br />
              {user.status}
              <br /> 2:40 PM
            </Popup>
          </div>
        ))}
      </ReactMapGL>
    </div>
  );
}
