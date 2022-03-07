import { useProfile } from '../../context/ProfileContext';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export default function ProfileForm({ isCreating, handleProfile }) {
  const { profile, setProfile } = useProfile();
  const history = useHistory();
  const { formState, formError, handleFormChange, setFormError } = useForm({
    username: profile.username || '',
    first_name: profile.first_name || '',
    likes: profile.likes || '',
    avatar: profile.avatar || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, first_name, avatar, likes } = formState;

    try {
      if (username.length > 4) {
        const resp = await handleProfile(username, first_name, avatar, likes);
        setProfile(
          (prevState) => (
            resp.username,
            resp.first_name,
            resp.avatar,
            resp.likes,
            { ...prevState }
          )
        );
      } else {
        setFormError('username is required and must be more than 4 characters');
      }
    } catch (error) {
      setFormError(error);
    }

    history.replace('/');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-2 justify-between h-3/4 p-5 items-center"
    >
      <label
        className="font-cursive text-4xl md:text-6xl tracking-wider"
        htmlFor="username"
      >
        Username
      </label>
      {isCreating ? (
        <>
          <p className="p-1 text-orange text-sm md:text-lg">
            *Choose carefully! Your username must be unique and cannot be
            changed after creating your profile.
          </p>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="username"
            value={formState.username}
            onChange={handleFormChange}
            className="p-2 rounded-md text-center md:text-2xl"
          />
        </>
      ) : (
        <h2 className="p-2 text-xl md:text-3xl">{formState.username}</h2>
      )}
      <label
        className="font-cursive text-4xl md:text-6xl tracking-wider"
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
        className="p-2 rounded-md text-center md:text-2xl"
      />
      <label
        className="font-cursive text-4xl md:text-6xl tracking-wider"
        htmlFor="likes"
      >
        Likes
      </label>
      <input
        id="likes"
        name="likes"
        type="text"
        placeholder="likes or interests"
        value={formState.likes}
        onChange={handleFormChange}
        className="p-2 rounded-md text-center md:text-2xl"
      />
      <label
        className="font-cursive text-4xl md:text-6xl tracking-wider"
        htmlFor="avatar"
      >
        Map Icon
      </label>
      <input
        id="avatar"
        name="avatar"
        type="text"
        placeholder="🗺️"
        value={formState.avatar}
        onChange={handleFormChange}
        className="p-2 rounded-md text-center placeholder:opacity-30 w-1/4 bg-white ring-tint bg-opacity-10 text-4xl md:text-6xl"
      />
      <p className="text-sm text-center md:text-lg w-3/4 md:w-1/2">
        <em>Tip</em>: to open an emoji keyboard on{' '}
        <span className="font-bold">MacOS</span>, use{' '}
        <span className="font-bold">Ctrl + Cmd + Space</span>! For Windows,
        press <span className="font-bold">Windows key + .</span>{' '}
      </p>
      {formError && (
        <p className="bg-white/40 text-orange p-2 rounded-md">{formError}</p>
      )}
      <button className="bg-teal text-white w-52 p-2 rounded-md md:text-3xl">
        Submit
      </button>
    </form>
  );
}
