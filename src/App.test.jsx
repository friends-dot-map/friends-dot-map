import { render, screen } from '@testing-library/react';
import { UserProvider } from './context/UserContext';
import { ProfileProvider } from './context/ProfileContext';
import { GroupProvider } from './context/GroupContext';
import App from './App';

test('should render the app title', () => {
  render(
    <UserProvider>
      <ProfileProvider>
        <GroupProvider>
          <App />
        </GroupProvider>
      </ProfileProvider>
    </UserProvider>
  );
  const title = screen.getByRole('heading', { name: /friends\.map\(\)/i });

  expect(title).toBeInTheDocument();
});
