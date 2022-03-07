import { useState, useEffect } from 'react';
import { useProfile } from '../../context/ProfileContext';
import Map from '../../components/Map/Map';
import Loader from '../../components/Loader/Loader';

export default function Home() {
  const [viewport, setViewport] = useState({
    latitude: '',
    longitude: '',
    zoom: 12,
  });
  const { setUserCoords, profile } = useProfile();

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

  return (
    <Map
      {...{
        viewport,
        setViewport,
        setUserCoords,
      }}
    />
  );
}
