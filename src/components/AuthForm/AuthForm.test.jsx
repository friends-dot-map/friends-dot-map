import AuthForm from './AuthForm';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom/';

test('auth form renders register page', () => {
  const { container } = render(
    <MemoryRouter>
      <AuthForm isSigningUp={true} />
    </MemoryRouter>
  );

  screen.getByRole('button', { name: /register/i });

  expect(container).toMatchSnapshot();
});

test('auth form renders login page', () => {
  const { container } = render(
    <MemoryRouter>
      <AuthForm isSigningUp={false} />
    </MemoryRouter>
  );

  screen.getByRole('button', { name: /log in/i });
  expect(container).toMatchSnapshot();
});
