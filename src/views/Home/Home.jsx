import React, { useState, useEffect } from 'react';
import Map from '../../components/Map/Map';
import { useProfile } from '../../context/ProfileContext';

export default function Home() {
  const [loading, setLoading] = useState(true);

  const [viewport, setViewport] = useState({
    latitude: '',
    longitude: '',
    zoom: 14,
  });
  const { userCoords, setUserCoords } = useProfile();
  // const [userCoords, setUserCoords] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
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

  console.log(userCoords);

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
