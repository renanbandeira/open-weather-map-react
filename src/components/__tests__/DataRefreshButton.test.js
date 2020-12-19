import { render, screen } from '@testing-library/react';
import DataRefreshButton from '../DataRefreshButton';

test('renders data refresh button', () => {
  render(<DataRefreshButton />);
  const buttonElement = screen.getByText(/Atualizar Dados/i);
  expect(buttonElement).toBeInTheDocument();
});
