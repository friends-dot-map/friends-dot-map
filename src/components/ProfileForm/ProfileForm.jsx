export default function ProfileForm({
  profile,
  handleProfile,
  updateProfileForm,
}) {
  const { username, first_name, likes, avatar, status } = profile;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleProfile(username, first_name, status, avatar, likes);
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
        <label>
          Status
          <input
            placeholder="what are you up to?"
            value={status}
            type="text"
            onChange={(e) => {
              updateProfileForm('status', e.target.value);
            }}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}
