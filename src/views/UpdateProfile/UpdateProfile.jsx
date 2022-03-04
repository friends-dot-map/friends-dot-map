import { useUser } from '../../context/UserContext';
import { useProfile } from '../../context/ProfileContext';
import {
  createProfile,
  updateProfile,
  deleteProfileByEmail,
} from '../../services/profiles';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import Loader from '../../components/Loader/Loader';

export default function UpdateProfile({ isCreating = false }) {
  const { user } = useUser();
  const { profile, loading, setProfile } = useProfile();

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

  if (loading)
    return (
      <div aria-label="loader">
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
