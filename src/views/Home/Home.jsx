import React, { useState, useEffect } from 'react';
import Map from '../../components/Map/Map';
import { useUser } from '../../context/userContext';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState({});
  const [viewport, setViewport] = useState({
    latitude: '',
    longitude: '',
    zoom: 14,
  });
  const { user } = useUser();

  const [userCoords, setUserCoords] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position && position.coords) {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
          setViewport((prevState) => ({ ...prevState, latitude, longitude }));
          setLoading(false);
        }
      });
    };
    fetchLocation();
  }, []);

  const handleCoords = async () => {
    try {
      await updateCoords(coords, user.id);
      console.log(coords);
    } catch (error) {
      throw new Error('it isnt working..... yet');
    }
  };

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
          handleCoords,
        }}
      />
    </>
  );
}
