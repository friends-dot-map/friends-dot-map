import { useForm } from '../../hooks/useForm';

export default function AuthForm({ handleAuth, isSigningUp }) {
  const { formState, formError, handleFormChange, setFormError } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formState;

    try {
      await handleAuth(email, password);
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <form className="flex flex-col items-center w-3/4 space-y-5 md:space-y-8">
      <input
        name="email"
        type="email"
        placeholder="email"
        aria-label="email"
        autoComplete="username"
        value={formState.email}
        onChange={handleFormChange}
        className="p-2 rounded-md md:text-3xl"
      />
      <input
        name="password"
        type="password"
        placeholder="password"
        aria-label="password"
        autoComplete="current-password"
        value={formState.password}
        onChange={handleFormChange}
        className="p-2 rounded-md md:text-3xl"
      />
      {formError && (
        <p className="bg-white/80 text-orange p-2 rounded-md">{formError}</p>
      )}
      <button
        className="bg-teal text-white w-52 p-2 rounded-md md:text-3xl"
        onClick={handleSubmit}
      >
        {isSigningUp ? 'Register' : 'Log In'}
      </button>
    </form>
  );
}
