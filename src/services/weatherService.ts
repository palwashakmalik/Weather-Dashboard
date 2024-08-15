import axios from 'axios';

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

export const getWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`/api/weather`, {
      params: {
        city,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching weather data:', error.message);
    throw new Error('Failed to fetch weather data');
  }
};
