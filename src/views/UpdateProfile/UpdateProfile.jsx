import ProfileForm from '../../components/ProfileForm/ProfileForm';
import { useUser } from '../../context/userContext';
import {
  createProfile,
  getProfile,
  updateProfile,
} from '../../services/profiles';
import { useState, useEffect } from 'react';

export default function UpdateProfile({ isCreating = false }) {
  const { user } = useUser();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile();
      setProfile(profile);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleProfile = async (username, first_name, status, avatar, likes) => {
    try {
      if (isCreating) {
        const data = await createProfile({
          user_id: user.id,
          username,
          first_name,
          status,
          avatar,
          likes,
        });
        setProfile(data);
      } else {
        const data = await updateProfile({
          user_id: user.id,
          username,
          first_name,
          status,
          avatar,
          likes,
        });
        setProfile(data);
      }
    } catch (error) {
      throw new Error('Unable to update Supabase');
    }
  };

  const updateProfileForm = (key, value) => {
    profile[key] = value;
    setProfile({ ...profile });
  };

  if (loading) return <h1>loading</h1>;
  return (
    <div>
      <ProfileForm {...{ profile, handleProfile, updateProfileForm }} />
    </div>
  );
}
