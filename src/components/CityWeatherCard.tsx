// src/components/CityWeatherCard.tsx
import React, { useEffect, useState } from 'react';
import { getWeatherData } from '@/services/weatherService';
import { FaStar, FaRegStar } from 'react-icons/fa';

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

interface CityWeatherCardProps {
  city: string;
  isFavorite: boolean;
  addToFavorites: (city: string) => void;
  removeFromFavorites: (city: string) => void;
}

const CityWeatherCard: React.FC<CityWeatherCardProps> = ({
  city,
  isFavorite,
  addToFavorites,
  removeFromFavorites,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWeatherData(city);
      setWeatherData(data);
    };

    fetchData();
  }, [city]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(city);
    } else {
      addToFavorites(city);
    }
  };

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 rounded shadow relative">
      <button className="absolute top-2 right-2" onClick={toggleFavorite}>
        {isFavorite ? (
          <FaStar className="text-yellow-500" />
        ) : (
          <FaRegStar className="text-gray-500" />
        )}
      </button>
      <h2 className="text-xl font-semibold">{weatherData.name}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Condition: {weatherData.weather[0].description}</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt={weatherData.weather[0].description}
      />
    </div>
  );
};

export default CityWeatherCard;
