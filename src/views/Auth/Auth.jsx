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
        <h2 className="text-3xl font-semibold">
          {isSigningUp ? 'Create an account' : 'Welcome back!'}
        </h2>
        <hr className="w-1/2 h-1 bg-dark/30 border-0 rounded-md" />

        <AuthForm handleAuth={handleAuth} isSigningUp={isSigningUp} />

        {isSigningUp ? (
          <p>
            Already have an account?{' '}
            <Link className="font-semibold block" to="/login">
              Log In
            </Link>
          </p>
        ) : (
          <p>
            Need to make an account?{' '}
            <Link className="font-semibold block" to="/register">
              Register
            </Link>
          </p>
        )}
        <div className="flex flex-col items-center spatext-xl bg-white ring-tint bg-opacity-70 p-5 rounded-md">
          <p className="font-semibold">About</p>
          <hr className="w-1/2 h-1 bg-dark opacity-30 border-1 rounded-md" />
          <p>
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
