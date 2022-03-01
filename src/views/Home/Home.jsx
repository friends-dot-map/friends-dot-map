import React, { useState } from 'react';
import Map from '../../components/Map/Map';

export default function Home() {
  const [viewport, setViewport] = useState({
    latitude: 45.633,
    longitude: -122.65,
    zoom: 14,
  });

  const [userCoords, setUserCoords] = useState(null);
  const [showPopup, setShowPopup] = useState(true);

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
