import { createContext, useContext, useState, useEffect } from 'react';
import { useProfile } from '../ProfileContext'


export const GroupContext = createContext();

const GroupProvider = ({ mockGroup, children }) => {
  const [group, setGroup] = useState([]);
  const { profile } = useProfile();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const data = mockGroup || [];
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
