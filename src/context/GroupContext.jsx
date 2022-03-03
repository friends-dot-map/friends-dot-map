import { createContext, useContext, useState, useEffect } from 'react';
import { getAllProfiles } from '../services/profiles';

export const GroupContext = createContext();

const GroupProvider = ({ children }) => {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const data = await getAllProfiles();
        setGroup(data);
      } catch (error) {
        throw error('something went horribly wrong');
      }
    };
    fetchGroup();
  }, []);
  const groupValue = { group, setGroup };
  return (
    <GroupContext.Provider value={groupValue}>{children}</GroupContext.Provider>
  );
};

const useGroup = () => {
  const context = useContext(GroupContext);

  if (context === undefined) {
    throw new Error('useGroup must be used within a GroupProvider');
  }

  return context;
};

export { GroupProvider, useGroup };
