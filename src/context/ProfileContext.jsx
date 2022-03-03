import { createContext, useContext, useState, useEffect } from 'react';
import { getProfile } from '../services/profiles';
import { useUser } from './userContext';

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [userCoords, setUserCoords] = useState({});

  const [profile, setProfile] = useState({
    username: '',
    first_name: '',
    likes: '',
    status: '',
    avatar: '',
    coords: userCoords,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile(user.email);
        setProfile(profileData);
      } catch (error) {
        throw new Error('Could not fetch profile');
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const profileValues = {
    profile,
    loading,
    setLoading,
    setProfile,
    userCoords,
    setUserCoords,
  };

  return (
    <ProfileContext.Provider value={profileValues}>
      {children}
    </ProfileContext.Provider>
  );
};

const useProfile = () => {
  const context = useContext(ProfileContext);

  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }

  return context;
};

export { ProfileProvider, useProfile };
