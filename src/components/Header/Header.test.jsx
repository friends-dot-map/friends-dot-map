import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProfileProvider } from '../../context/ProfileContext';
import { UserProvider } from '../../context/UserContext';

import Header from './Header';

test('should render the header', () => {
  const {container} = render(
    <UserProvider>
      <ProfileProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ProfileProvider>
    </UserProvider>
  );
  

  expect(container).toMatchSnapshot();
});
