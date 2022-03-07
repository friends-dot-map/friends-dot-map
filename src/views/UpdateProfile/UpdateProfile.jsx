import { useUser } from '../../context/UserContext';
import { useProfile } from '../../context/ProfileContext';
import { useGroup } from '../../context/GroupContext';
import { createProfile, updateProfile } from '../../services/profiles';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import Loader from '../../components/Loader/Loader';

export default function UpdateProfile({ isCreating = false }) {
  const { user } = useUser();
  const { profileLoading } = useProfile();
  const { groupLoading } = useGroup();

  const handleProfile = async (username, first_name, avatar, likes) => {
    try {
      if (isCreating) {
        const data = await createProfile({
          user_id: user.id,
          email: user.email,
          username: username,
          first_name: first_name,
          status: '',
          avatar: avatar,
          likes: likes,
          coords: { latitude: '', longitude: '' },
        });
        return data;
      } else {
        const data = await updateProfile(
          user.email,
          username,
          first_name,
          avatar,
          likes
        );
        return data;
      }
    } catch (error) {
      throw new Error('Unable to update Supabase');
    }
  };

  if (groupLoading || profileLoading)
    return (
      <div aria-label="loader" className="bg-dark w-screen h-screen">
        <Loader />
      </div>
    );
  return <ProfileForm {...{ isCreating, handleProfile }} />;
}
