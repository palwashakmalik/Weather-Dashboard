import axios from 'axios';
import { NextResponse } from 'next/server';

const API_KEY = process.env.OPENWEATHER_MAP_API_KEY as string;
const BASE_URL = process.env.BASE_URL as string;

interface WeatherData {
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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const city = url.searchParams.get('city');

  if (!city || typeof city !== 'string') {
    return NextResponse.json(
      { error: 'City parameter is required' },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get<WeatherData>(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching weather data:', error.message);
      return NextResponse.json(
        { error: 'Failed to fetch weather data' },
        { status: 500 }
      );
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json(
        { error: 'Unexpected error occurred' },
        { status: 500 }
      );
    }
  }
}
