import { useState, useEffect } from 'react';
import { useProfile } from '../../context/ProfileContext';
import Map from '../../components/Map/Map';
import Loader from '../../components/Loader/Loader';
import { useGroup } from '../../context/GroupContext';

export default function Home() {
  const [viewport, setViewport] = useState({
    latitude: '',
    longitude: '',
    zoom: 12,
  });
  const { setUserCoords, profileLoading, profile } = useProfile();
  const { groupLoading } = useGroup();

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

  if (groupLoading || profileLoading)
    return (
      <div aria-label="loader" className="bg-dark w-screen h-screen">
        <Loader />
      </div>
    );

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
