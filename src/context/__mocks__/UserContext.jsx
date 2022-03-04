import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ mockUser, children }) => {
  const [user, setUser] = useState(
    mockUser ? { id: mockUser.id, email: mockUser.email } : {}
  );

  const userValues = { user, setUser };

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
