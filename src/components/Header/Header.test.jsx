import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../../context/UserContext';

import Header from './Header';

test.skip('should render the header title', async () => {
  render(
    <UserProvider>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </UserProvider>
  );
  const title = await screen.findByRole('heading', {
    name: /friends\.map\(\)/i,
  });

  expect(title).toBeInTheDocument();
});
