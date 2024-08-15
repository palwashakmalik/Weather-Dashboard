'use client';
import React, { useEffect, useState } from 'react';
import CityWeatherCard from '@/components/CityWeatherCard';
import { getWeatherData } from '@/services/weatherService';
import { useDebounce } from 'use-debounce';

const cities = ['Dubai', 'New York', 'London', 'Tokyo', 'Sydney'];

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // debounce time set to 500ms
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const saveFavoritesToLocalStorage = (favorites: string[]) => {
    localStorage.setItem('favoriteCities', JSON.stringify(favorites));
  };

  const addToFavorites = (city: string) => {
    if (!favoriteCities.includes(city)) {
      const newFavorites = [...favoriteCities, city];
      setFavoriteCities(newFavorites);
      saveFavoritesToLocalStorage(newFavorites);
    }
  };

  const removeFromFavorites = (city: string) => {
    const newFavorites = favoriteCities.filter((favCity) => favCity !== city);
    setFavoriteCities(newFavorites);
    saveFavoritesToLocalStorage(newFavorites);
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteCities');
    if (storedFavorites) {
      setFavoriteCities(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery.length > 1) {
      const filteredCities = cities.filter((city) =>
        city.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
      setSuggestions(filteredCities);

      const fetchWeather = async () => {
        try {
          const data = await getWeatherData(debouncedSearchQuery);
          if (data) {
            setSearchResult(data.name);
          }
        } catch (error) {
          console.error(
            'Error fetching weather data for searched city:',
            error
          );
        }
      };

      fetchWeather();
    } else {
      setSuggestions([]);
      setSearchResult(null);
    }
  }, [debouncedSearchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const uniqueCities = Array.from(
    new Set([
      ...favoriteCities,
      ...cities.filter((city) => !favoriteCities.includes(city)),
    ])
  );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Weather Dashboard</h1>
      <div className="mb-6">
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search for a city"
            className="flex-grow p-2 border border-gray-300 rounded-l text-black"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>
        {suggestions.length > 0 && (
          <div className="border border-gray-300 rounded-md max-h-40 overflow-y-auto mt-2">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSearchQuery(suggestion);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      {searchResult && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CityWeatherCard
              city={searchResult}
              isFavorite={favoriteCities.includes(searchResult)}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
            />
          </div>
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Cities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {uniqueCities.map((city) => (
            <CityWeatherCard
              key={city}
              city={city}
              isFavorite={favoriteCities.includes(city)}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
