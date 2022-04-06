import { createContext, useContext, useState, useEffect } from 'react';
import { getAllProfiles } from '../services/profiles';
import { useProfile } from './ProfileContext';

export const GroupContext = createContext();

const GroupProvider = ({ children }) => {
  const [group, setGroup] = useState([]);
  const [groupLoading, setGroupLoading] = useState(true);
  const { profile } = useProfile();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const data = await getAllProfiles();
        setGroup(data);
      } catch {
        setGroup([]);
      }
      setGroupLoading(false);
    };
    fetchGroup();
    // I think i'm remembering that you need profile in the dep array so that if the user updates their
    // status this would reload the list of profiles?
  }, [profile]);

  const groupValue = { group, groupLoading };

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
