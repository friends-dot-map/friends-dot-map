import { Link, useHistory } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { signUpUser, signInUser } from '../../services/users';
import AuthForm from '../../components/AuthForm/AuthForm';

export default function Auth({ isSigningUp = false }) {
  const { setUser } = useUser();
  const history = useHistory();

  const handleAuth = async (email, password) => {
    try {
      if (isSigningUp) {
        const data = await signUpUser(email, password);
        setUser({ id: data.id, email: data.email });
        history.replace('/create');
      } else {
        const data = await signInUser(email, password);
        setUser({ id: data.id, email: data.email });
        history.replace('/');
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <div className="flex flex-col text-center items-center justify-evenly text-xl p-5 h-full">
        <h2 className="text-3xl md:text-5xl font-semibold">
          {isSigningUp ? 'Create an account' : 'Welcome back!'}
        </h2>
        <hr className="w-40 md:w-60 h-1 bg-dark/30 border-0 rounded-md" />

        <AuthForm handleAuth={handleAuth} isSigningUp={isSigningUp} />

        {isSigningUp ? (
          <p className="md:text-3xl">
            Already have an account?{' '}
            <Link className="font-semibold block md:text-3xl" to="/login">
              Log In
            </Link>
          </p>
        ) : (
          <p className="md:text-3xl">
            Need to make an account?{' '}
            <Link className="font-semibold block md:text-3xl" to="/register">
              Register
            </Link>
          </p>
        )}
        <div className="flex flex-col items-center w-80 md:w-1/2 md:text-2xl space-y-3 text-xl bg-white/40 ring-tint p-5 rounded-md">
          <p className="font-semibold md:text-3xl">About</p>
          <hr className="w-40 md:w-60 h-1 bg-dark/30 border-0 rounded-md" />
          <p className="text-sm md:text-2xl">
            <span className="font-semibold">friends.map(🗺️)</span> is a
            convenient travel companion that helps to keep you and your groups
            safe and organized in unfamiliar places while protecting your
            privacy.
          </p>
        </div>
        <div className="h-1/6"></div>
      </div>
    </>
  );
}
