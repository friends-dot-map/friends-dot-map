import { render, screen } from '@testing-library/react';
import App from './App';

test('should render the app title', () => {
  render(<App />);
  const title = screen.getByRole('heading', { name: /friends\.map\(\)/i });

  expect(title).toBeInTheDocument();
});
