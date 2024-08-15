import React, { createContext, useState, ReactNode } from 'react';

interface FavoritesContextProps {
  favorites: string[];
  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
}

export const FavoritesContext = createContext<FavoritesContextProps>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const addFavorite = (city: string) => {
    setFavorites([...favorites, city]);
  };

  const removeFavorite = (city: string) => {
    setFavorites(favorites.filter((favorite) => favorite !== city));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
