import { createContext, useContext, useState, useEffect } from 'react';
import { getUser } from '../services/users';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const currentUser = getUser();
  const [coords, setCoords] = useState({});
  const [user, setUser] = useState(
    currentUser ? { id: currentUser.id, email: currentUser.email } : {}
  );
  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        if (position && position.coords) {
          setCoords(position.coords);
          setLoading(false);
        }
      });
    };
    fetchLocation();
  }, []);

  const userValues = { loading, user, setUser, coords };

  return (
    <UserContext.Provider value={userValues}>{children}</UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export { UserProvider, useUser };
