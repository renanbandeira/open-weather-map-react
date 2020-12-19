import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import WeatherContainer from '../WeatherContainer';

test('renders without crashing', () => {
  render(<WeatherContainer />);
  const buttonElement = screen.getByText(/Atualizar Dados/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders fetching geolocation', async () => {
  let calls = 0;
  const mockGeolocation = {
    getCurrentPosition: jest.fn(() => calls++),
  };

  global.navigator.geolocation = mockGeolocation;
  await act(async () => render(<WeatherContainer />));
  expect(calls).toEqual(1);
});
