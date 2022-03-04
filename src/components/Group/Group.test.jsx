import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GroupProvider } from '../../context/GroupContext';
import { ProfileProvider } from '../../context/ProfileContext';
import { UserProvider } from '../../context/UserContext';

import Group from './Group';

test('should render the header', () => {
  const { container } = render(
    <UserProvider>
      <ProfileProvider>
        <GroupProvider>
          <MemoryRouter>
            <Group />
          </MemoryRouter>
        </GroupProvider>
      </ProfileProvider>
    </UserProvider>
  );

  expect(container).toMatchSnapshot();
});
