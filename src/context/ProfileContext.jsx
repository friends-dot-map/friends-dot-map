import { createContext, useContext, useState, useEffect } from 'react';
import { getProfile } from '../services/profiles';
import { useUser } from './UserContext';
import { formatDate } from '../utils/utils';

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [userCoords, setUserCoords] = useState({ latitude: '', longitude: '' });
  const [profile, setProfile] = useState({
    username: '',
    first_name: '',
    likes: '',
    status: '',
    avatar: '',
    coords: userCoords,
    updated_at: formatDate(),
  });
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile(user.email);
        setProfile(profileData);
      } catch (error) {
        setProfile({});
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

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
