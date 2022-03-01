import React, { useState } from 'react';
import Map from '../../components/Map/Map';
import { useUser } from '../../context/userContext';

export default function Home() {
  // const [loading, setLoading] = useState(true);
  const { coords, loading } = useUser();
  console.log(coords.latitude);
  const [viewport, setViewport] = useState({
    latitude: coords.latitude,
    longitude: coords.longitude,
    zoom: 14,
  });

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
