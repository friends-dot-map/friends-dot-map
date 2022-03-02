import { useProfile } from '../../context/ProfileContext';

export default function DisplayProfile() {
  const {
    profile: { username, first_name, likes, avatar, status },
  } = useProfile();
  return (
    <div>
      <p>{avatar}</p>
      <p>{username}</p>
      <p>{first_name}</p>
      <p>{likes}</p>
      <p>{status}</p>
    </div>
  );
}
