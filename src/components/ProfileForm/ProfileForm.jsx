import { useProfile } from '../../context/ProfileContext';
import { useHistory } from 'react-router-dom';

export default function ProfileForm({
  isCreating,
  handleProfile,
  updateProfileForm,
  handleDeleteProfile,
}) {
    const history = useHistory();
  const {
    profile: { username, first_name, likes, avatar, status },
  } = useProfile();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleProfile(username, first_name, status, avatar, likes);
    history.replace('/');
  };

  return (
    <div>
      <h1>ProfileForm</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            placeholder="make it unique"
            value={username}
            type="text"
            onChange={(e) => {
              updateProfileForm('username', e.target.value);
            }}
          />
        </label>
        <label>
          First Name
          <input
            placeholder="enter your name"
            value={first_name}
            type="text"
            onChange={(e) => {
              updateProfileForm('first_name', e.target.value);
            }}
          />
        </label>
        <label>
          Likes
          <input
            placeholder="enter your likes"
            value={likes}
            type="text"
            onChange={(e) => {
              updateProfileForm('likes', e.target.value);
            }}
          />
        </label>
        <label>
          Avatar
          <input
            placeholder="select an emoji"
            value={avatar}
            type="text"
            onChange={(e) => {
              updateProfileForm('avatar', e.target.value);
            }}
          />
        </label>
        
        <button>Submit</button>
      </form>
      {!isCreating && (
        <button className="text-red-400" onClick={handleDeleteProfile}>
          Delete profile
        </button>
      )}
    </div>
  );
}
