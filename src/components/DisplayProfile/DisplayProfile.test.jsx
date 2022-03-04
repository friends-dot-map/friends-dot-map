import DisplayProfile from './DisplayProfile';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { ProfileProvider } from '../../context/ProfileContext';
import { GroupProvider } from '../../context/GroupContext';
import { UserProvider } from '../../context/UserContext';

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

test('display profile renders', () => {
  const { container } = render(
    <UserProvider mockUser={mockUser}>
      <ProfileProvider mockProfile={mockProfile}>
        <GroupProvider mockGroup={mockGroup}>
          <MemoryRouter initialEntries={['/profile/spongebob']}>
            <Route path="/profile/:username">
              <DisplayProfile />
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
