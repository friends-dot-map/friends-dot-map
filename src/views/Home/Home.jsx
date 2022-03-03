import { useState, useEffect } from 'react';
import { useProfile } from '../../context/ProfileContext';
import Map from '../../components/Map/Map';

export default function Home() {
  const { userCoords, setUserCoords } = useProfile();
  const [loading, setLoading] = useState(true);

  const [viewport, setViewport] = useState({
    latitude: '',
    longitude: '',
    zoom: 15,
  });

  const [showPopup, setShowPopup] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

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
          setLoading(false);
        }
      });
    };
    fetchLocation();
  }, []);

  if (loading) return <h1>loading...</h1>;

  return (
    <>
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
    </>
  );
}
