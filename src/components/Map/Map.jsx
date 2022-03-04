import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from 'react-map-gl';
import { useProfile } from '../../context/ProfileContext';
import { useGroup } from '../../context/GroupContext';
import { Link } from 'react-router-dom';
import NavButton from '../NavButton/NavButton';
import styles from './Map.module.css';

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

  if (loading && group.length < 1)
    return <div aria-label="loader">loading</div>;

  return (
    <div className={styles.map}>
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
            className="text-dark"
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
            </Link>
            {selectedUser?.first_name}
            <p>{selectedUser.status}</p>
            <p>{selectedUser.updated_at}</p>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
