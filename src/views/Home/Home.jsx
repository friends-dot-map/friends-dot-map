import React, { useState, useEffect } from 'react';
import Map from '../../components/Map/Map';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: '',
    longitude: '',
    zoom: 14,
  });

  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position && position.coords) {
          const { latitude, longitude } = position.coords;
          setViewport((prevState) => ({ ...prevState, latitude, longitude }));
          setLoading(false);
        }
      });
    };
    fetchLocation();
  }, []);

  const [userCoords, setUserCoords] = useState(null);
  const [showPopup, setShowPopup] = useState(true);

  if (loading) return <h1>loading...</h1>;

  return (
    <Map
      {...{
        viewport,
        setViewport,
        userCoords,
        setUserCoords,
        showPopup,
        setShowPopup,
      }}
    />
  );
}
