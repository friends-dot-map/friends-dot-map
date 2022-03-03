import { render, screen } from '@testing-library/react';
import { UserProvider } from './context/UserContext';
import { ProfileProvider } from './context/ProfileContext';
import { GroupProvider } from './context/GroupContext';
import App from './App';

test.skip('should render the app title', async () => {
  render(
    <UserProvider>
      <ProfileProvider>
        <GroupProvider>
          <App />
        </GroupProvider>
      </ProfileProvider>
    </UserProvider>
  );
  const title = await screen.findByRole('heading', {
    name: /friends\.map\(\)/i,
  });

  expect(title).toBeInTheDocument();
});
