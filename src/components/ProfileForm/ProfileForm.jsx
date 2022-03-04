import { useProfile } from '../../context/ProfileContext';
import { useHistory } from 'react-router-dom';

export default function ProfileForm({ handleProfile, updateProfileForm }) {
  const {
    profile: { username, first_name, likes, avatar, status },
  } = useProfile();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleProfile(username, first_name, status, avatar, likes);
    history.replace('/');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-2 justify-between h-3/4 p-5 items-center"
    >
      <label
        className="font-cursive text-4xl tracking-wider"
        htmlFor="username"
      >
        Username
      </label>
      <input
        id="username"
        required
        placeholder="username"
        value={username}
        type="text"
        onChange={(e) => {
          updateProfileForm('username', e.target.value);
        }}
        className="p-2 rounded-md text-center"
      />
      <label
        className="font-cursive text-4xl tracking-wider"
        htmlFor="first-name"
      >
        Your Name
      </label>
      <input
        id="first-name"
        placeholder="your name"
        value={first_name}
        type="text"
        onChange={(e) => {
          updateProfileForm('first_name', e.target.value);
        }}
        className="p-2 rounded-md text-center"
      />
      <label className="font-cursive text-4xl tracking-wider" htmlFor="likes">
        Likes
      </label>
      <input
        id="likes"
        placeholder="what are some of your interests?"
        value={likes}
        type="text"
        onChange={(e) => {
          updateProfileForm('likes', e.target.value);
        }}
        className="p-2 rounded-md text-center"
      />
      <label className="font-cursive text-4xl tracking-wider" htmlFor="avatar">
        User Icon
      </label>
      <input
        placeholder="🗺️"
        value={avatar}
        type="text"
        onChange={(e) => {
          updateProfileForm('avatar', e.target.value);
        }}
        className="p-2 rounded-md text-center placeholder:opacity-30 w-1/4 bg-white bg-opacity-10 text-4xl"
      />
      <p className="text-sm text-center">
        <em>Tip</em>: to open an emoji keyboard on{' '}
        <span className="font-bold">MacOS</span>, use{' '}
        <span className="font-bold">Ctrl + Cmd + Space</span>! For Windows,
        press <span className="font-bold">Windows key + .</span>{' '}
      </p>

      <button className="bg-teal text-white text-lg w-1/2 p-2 rounded-md">
        Submit
      </button>
    </form>
  );
}
