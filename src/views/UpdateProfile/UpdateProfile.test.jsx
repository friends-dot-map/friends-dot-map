import { render, screen } from '@testing-library/react';
import UpdateProfile from './UpdateProfile';
import { UserProvider } from '../../context/UserContext';
import { ProfileProvider } from '../../context/ProfileContext';
import { GroupProvider } from '../../context/GroupContext';

test('can edit an existing profile', () => {
  render(
    <UserProvider>
      <ProfileProvider>
        <GroupProvider>
          <UpdateProfile />
        </GroupProvider>
      </ProfileProvider>
    </UserProvider>
  );
});
