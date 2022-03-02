import React from 'react';
import { useHistory } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useUser } from '../../context/userContext';
import { signUpUser, signInUser } from '../../services/users';

export default function Auth({ isSigningUp = false }) {
  const { setUser } = useUser();
  const history = useHistory();

  const handleAuth = async (email, password) => {
    try {
      if (isSigningUp) {
        await signUpUser(email, password);
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
    <div>
      <AuthForm handleAuth={handleAuth} isSigningUp={isSigningUp} />
    </div>
  );
}
