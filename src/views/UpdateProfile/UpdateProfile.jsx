import { useUser } from '../../context/UserContext';
import { useProfile } from '../../context/ProfileContext';
import { useGroup } from '../../context/GroupContext';
import {
  createProfile,
  updateProfile,
  deleteProfileByEmail,
} from '../../services/profiles';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import Loader from '../../components/Loader/Loader';

export default function UpdateProfile({ isCreating = false }) {
  const { user } = useUser();
  const { profile, profileLoading, setProfile } = useProfile();
  const { groupLoading } = useGroup();

  const handleProfile = async (username, first_name, status, avatar, likes) => {
    try {
      if (isCreating) {
        const data = await createProfile({
          user_id: user.id,
          email: user.email,
          username,
          first_name,
          status,
          avatar,
          likes,
          coords: { latitude: '', longitude: '' },
        });
        setProfile(data);
      } else {
        const data = await updateProfile({
          user_id: user.id,
          email: user.email,
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

  const handleDeleteProfile = async () => {
    try {
      await deleteProfileByEmail(user.email);
    } catch (error) {
      throw error;
    }
  };

  const updateProfileForm = (key, value) => {
    profile[key] = value;
    setProfile({ ...profile });
  };

  if (groupLoading || profileLoading)
    return (
      <div aria-label="loader" className="bg-dark w-screen h-screen">
        <Loader />
      </div>
    );
  return (
    <ProfileForm
      {...{
        isCreating,
        handleProfile,
        updateProfileForm,
        handleDeleteProfile,
      }}
    />
  );
}
