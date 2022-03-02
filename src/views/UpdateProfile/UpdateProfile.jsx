import ProfileForm from "../../components/ProfileForm/ProfileForm";
import { createProfile, updateProfile } from "../../services/profiles";
import { useState } from "react";

export default function UpdateProfile({isCreating = true}) {
const [profile, setProfile] = useState({});


  const handleProfile = async ( username, first_name, status, avatar, likes, coords ) => {
    try {
      if (isCreating) {
        const data = await createProfile({ username, first_name, status, avatar, likes, coords });
        console.log(data);
        setProfile(data);
      } else {
        const data = await updateProfile({ username, first_name, status, avatar, likes, coords });
        setProfile(data);
      }
    } catch (error) {
      throw new Error('Error. Not able to update Supabase.')
    }
  }

  const updateProfileForm = (key, value) => {
    profile[key] = value;
    setProfile({ ...profile });
  };

  

  return (
    <div>
      <ProfileForm {...{profile, handleProfile, updateProfileForm}} />
    </div>
  )
}
