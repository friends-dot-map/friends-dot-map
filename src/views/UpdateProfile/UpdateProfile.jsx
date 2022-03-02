import ProfileForm from '../../components/ProfileForm/ProfileForm';
import { useUser } from '../../context/userContext';
import { createProfile, updateProfile } from '../../services/profiles';
import { useState } from 'react';

export default function UpdateProfile({ isCreating = true }) {
  const { user } = useUser();
  const [profile, setProfile] = useState({});
  console.log('user', user);

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
        console.log(data);
        setProfile(data);
      } else {
        const data = await updateProfile({
          username,
          first_name,
          status,
          avatar,
          likes,
        });
        setProfile(data);
      }
    } catch (error) {
      throw new Error('Error. Not able to update Supabase.');
    }
  };

  const updateProfileForm = (key, value) => {
    profile[key] = value;
    setProfile({ ...profile });
  };

  return (
    <div>
      <ProfileForm {...{ profile, handleProfile, updateProfileForm }} />
    </div>
  );
}
