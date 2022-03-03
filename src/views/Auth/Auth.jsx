import { useHistory } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useProfile } from '../../context/ProfileContext';
import { signUpUser, signInUser } from '../../services/users';
import AuthForm from '../../components/AuthForm/AuthForm';

export default function Auth({ isSigningUp = false }) {
  const { setProfile } = useProfile();
  const { setUser } = useUser();
  const history = useHistory();

  const handleAuth = async (email, password) => {
    try {
      if (isSigningUp) {
        const data = await signUpUser(email, password);
        setUser({ id: data.id, email: data.email });
        setProfile({});
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
  return <AuthForm handleAuth={handleAuth} isSigningUp={isSigningUp} />;
}
