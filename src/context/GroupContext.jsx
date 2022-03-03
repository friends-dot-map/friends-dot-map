import { createContext, useContext, useState, useEffect } from 'react';
import { getAllProfiles } from '../services/profiles';
import { useProfile } from './ProfileContext';

export const GroupContext = createContext();

const GroupProvider = ({ children }) => {
  const [group, setGroup] = useState([]);
  const { profile } = useProfile();

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
  }, [profile]);

  const groupValue = { group };

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
