import { createContext, useContext, useState, useEffect } from 'react';
import { getProfile } from '../services/profiles';
import { useUser } from './UserContext';
import { formatDate } from '../utils/utils';

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const { user } = useUser();
  const [userCoords, setUserCoords] = useState({ latitude: '', longitude: '' });
  const [profile, setProfile] = useState({});
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user.email) {
        try {
          const profileData = await getProfile(user.email);
          setProfile(profileData);
        } catch (error) {
          setProfile({
            user_id: user?.id,
            email: user?.email,
            username: '',
            first_name: '',
            likes: '',
            status: '',
            avatar: '',
            coords: userCoords,
            updated_at: formatDate(),
          });
          throw new Error('Cannot locate user profile');
        }
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
