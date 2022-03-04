import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '../UserContext';
import { formatDate } from '../../utils/utils';

export const ProfileContext = createContext();

const ProfileProvider = ({ mockProfile, children }) => {
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
  const [profileLoading, setProfileLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = mockProfile || {};
        setProfile(profileData);
      } catch (error) {
        setProfile({});
      }
      setProfileLoading(false);
    };
    fetchProfile();
  }, [user]);

  const profileValues = {
    profile,
    profileLoading,
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
