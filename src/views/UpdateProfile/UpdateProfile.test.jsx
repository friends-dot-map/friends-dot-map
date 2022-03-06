import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProvider } from '../../context/UserContext';
import { ProfileProvider } from '../../context/ProfileContext';
import { MemoryRouter } from 'react-router-dom';
import UpdateProfile from './UpdateProfile';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { GroupProvider } from '../../context/GroupContext';

const mockProfile = {
  avatar: '🐶',
  firstName: 'spongebob',
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
    firstName: 'spongebob',
    first_name: 'charles',
    likes: 'snails',
    status: 'rockin in the free world',
    coords: { latitude: 69, longitude: 420 },
  },
];

jest.mock('../../context/ProfileContext');
jest.mock('../../context/UserContext');
jest.mock('../../context/GroupContext');

const handleSubmit = rest.get(
  'https://whltcdvprhlkmnqqqllw.supabase.co',
  (req, res, ctx) => {
    return res(ctx.json(mockProfile));
  }
);

const server = setupServer(handleSubmit);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

test.only('can edit an existing profile', async () => {
  render(
    <UserProvider mockUser={mockUser}>
      <ProfileProvider mockProfile={mockProfile}>
        <GroupProvider mockGroup={mockGroup}>
          <MemoryRouter>
            <UpdateProfile />
          </MemoryRouter>
        </GroupProvider>
      </ProfileProvider>
    </UserProvider>
  );

  const firstName = await screen.findByRole('textbox', { name: /your name/i });
  expect(firstName).toBeInTheDocument();
  expect(firstName).toHaveValue('charles');

  userEvent.type(firstName, '{selectall}{del}carlos');
  expect(firstName).toHaveValue('carlos');

  const submit = screen.getByRole('button', { name: /submit/i });
  expect(submit).toBeInTheDocument();

  userEvent.click(submit);
});
