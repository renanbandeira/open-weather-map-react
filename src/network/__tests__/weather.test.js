import axios from 'axios';

import { getWeatherData } from '..';

jest.mock('axios');

describe('getWeatherData', () => {
  it('fetches successfully data from an API', async () => {
    const data = {
      data: {
        main: {
          temp: 27,
          temp_min: 25,
          temp_max: 31,
        },
      },
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(getWeatherData({ latitude: 1, longitude: 1 })).resolves.toEqual(data);
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    await expect(getWeatherData({ latitude: 1, longitude: 1 })).rejects.toThrow(errorMessage);
  });
});
