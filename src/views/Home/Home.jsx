import { useState, useEffect } from 'react';
import { useProfile } from '../../context/ProfileContext';
import Map from '../../components/Map/Map';

export default function Home() {
  const [showPopup, setShowPopup] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: '',
    longitude: '',
    zoom: 15,
  });
  const { userCoords, setUserCoords, loading, profile } = useProfile();

  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position && position.coords) {
          const { latitude, longitude } = position.coords;
          setViewport((prevState) => ({ ...prevState, latitude, longitude }));
          setUserCoords({
            latitude,
            longitude,
          });
        }
      });
    };
    fetchLocation();
  }, [profile]);

  if (loading) return <div aria-label="loader">Loading...</div>;

  return (
    <Map
      {...{
        viewport,
        setViewport,
        userCoords,
        setUserCoords,
        showPopup,
        setShowPopup,
        selectedUser,
        setSelectedUser,
      }}
    />
  );
}
