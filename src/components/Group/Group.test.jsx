import { render, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { GroupProvider } from '../../context/GroupContext';
import { ProfileProvider } from '../../context/ProfileContext';
import { UserProvider } from '../../context/UserContext';

import Group from './Group';

const mockProfile = {
  avatar: '🐶',
  username: 'spongebob',
  first_name: 'charles',
  likes: 'snails',
  status: 'rockin in the free world',
  coords: { latitude: 69, longitude: 420 },
};

const mockUser = {
  id: 33,
  email: 'billclinton@example.com',
  password: 'ilovemonica',
};

const mockGroup = [
  {
    avatar: '🐶',
    username: 'spongebob',
    first_name: 'charles',
    likes: 'snails',
    status: 'rockin in the free world',
    coords: { latitude: 69, longitude: 420 },
  },
];

jest.mock('../../context/ProfileContext');
jest.mock('../../context/UserContext');
jest.mock('../../context/GroupContext');

test('should render the header', () => {
  const { container } = render(
    <UserProvider mockUser={mockUser}>
      <ProfileProvider mockProfile={mockProfile}>
        <GroupProvider mockGroup={mockGroup}>
          <MemoryRouter initialEntries={['/group']}>
            <Route path="/group">
              <Group />
            </Route>
          </MemoryRouter>
        </GroupProvider>
      </ProfileProvider>
    </UserProvider>
  );

  expect(container).toMatchSnapshot();

  return waitFor(() => {
    expect(screen.queryByLabelText(/loader/i)).not.toBeInTheDocument();
  });
});
