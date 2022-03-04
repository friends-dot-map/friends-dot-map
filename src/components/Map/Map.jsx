import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from 'react-map-gl';
import { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { useGroup } from '../../context/GroupContext';
import { Link } from 'react-router-dom';
import NavButton from '../NavButton/NavButton';
import Loader from '../Loader/Loader';

export default function Map({ viewport, setViewport, setUserCoords }) {
  const { profile, profileLoading } = useProfile();
  const [showPopup, setShowPopup] = useState(true);
  const [selectedUser, setSelectedUser] = useState(() =>
    profile ? profile : null
  );
  const { group, groupLoading } = useGroup();

  if (groupLoading || profileLoading)
    return (
      <div aria-label="loader" className="bg-dark w-screen h-screen">
        <Loader />
      </div>
    );

  return (
    <div className="block absolute top-0 w-screen h-screen">
      <ReactMapGL
        {...viewport}
        reuseMaps
        mapStyle="mapbox://styles/spencereagleton/cl0c0c2c5004914rh8164a271"
        mapboxAccessToken={process.env.MapboxAccessToken}
        onMove={(e) => setViewport(e.viewState)}
      >
        <NavButton activeOnMap />
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
              className="text-3xl"
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
            className="text-dark text-left"
            longitude={selectedUser.coords.longitude}
            latitude={selectedUser.coords.latitude}
            anchor="top-right"
            focusAfterOpen
            closeButton={false}
            closeOnClick={false}
          >
            <Link
              className="font-bold text-lg"
              to={`/profile/${selectedUser.username}`}
            >
              {selectedUser.username}{' '}
            </Link>
            ({selectedUser?.first_name})
            <hr className="w-1/2 h-1 bg-dark opacity-30 border-1 rounded-md " />
            <p className="text-base italic">{selectedUser.status}</p>
            <p className="text-sm">{selectedUser.updated_at}</p>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
