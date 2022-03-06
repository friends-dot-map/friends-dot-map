import { useProfile } from '../../context/ProfileContext';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export default function ProfileForm({ handleProfile, updateProfileForm }) {
  const { profile, setProfile } = useProfile();
  const history = useHistory();
  const { formState, formError, handleFormChange, setFormError } = useForm({
    username: profile.username,
    first_name: profile.first_name,
    likes: profile.likes,
    avatar: profile.avatar,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, first_name, avatar, likes } = formState;

    try {
      const resp = await handleProfile(username, first_name, avatar, likes);
      setProfile((prevState) => ({
        ...prevState,
        username,
        first_name,
        avatar,
        likes,
      }));
      console.log('resp', resp);
    } catch (error) {
      throw new Error('what is happening');
    }

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
        name="username"
        type="text"
        placeholder="username"
        value={formState.username}
        onChange={handleFormChange}
        className="p-2 rounded-md text-center"
      />
      <label
        className="font-cursive text-4xl tracking-wider"
        htmlFor="first_name"
      >
        Your Name
      </label>
      <input
        id="first_name"
        name="first_name"
        type="text"
        placeholder="your name"
        value={formState.first_name}
        onChange={handleFormChange}
        className="p-2 rounded-md text-center"
      />
      <label className="font-cursive text-4xl tracking-wider" htmlFor="likes">
        Likes
      </label>
      <input
        id="likes"
        name="likes"
        type="text"
        placeholder="likes or interests"
        value={formState.likes}
        onChange={handleFormChange}
        className="p-2 rounded-md text-center"
      />
      <label className="font-cursive text-4xl tracking-wider" htmlFor="avatar">
        Map Icon
      </label>
      <input
        id="avatar"
        name="avatar"
        type="text"
        placeholder="🗺️"
        value={formState.avatar}
        onChange={handleFormChange}
        className="p-2 rounded-md text-center placeholder:opacity-30 w-1/4 bg-white ring-tint bg-opacity-10 text-4xl"
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
