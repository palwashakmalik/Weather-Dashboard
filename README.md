# Weather Dashboard

## Description

The Weather Dashboard is a responsive web application that displays current weather information for a list of default cities, allows users to search for new cities, and add cities to their favorites.

## Features

- **Default Cities:** Displays weather data for a list of predefined cities.
- **Search Functionality:** Users can search for any city to view its weather.
- **Favorites Management:** Users can add cities to their favorites list.
- **Persistence:** Favorite cities are saved in local storage and persist across sessions.
- **Responsive Design:** The application is designed to be responsive for different device sizes.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (version 14 or higher)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- An API key from [OpenWeatherMap](https://openweathermap.org/)

## Installation

Follow these steps to install and set up the project:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/weather-dashboard.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd weather-dashboard
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

## Environment Variables

Set up the environment variables by following these steps:

1. **Create a `.env` file in the root of your project directory:**

   ```bash
   touch .env
   ```

2. **Open the `.env` file and add the following variables or see .env.example for example:**

   ```env
   OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
   BASE_URL=https://api.openweathermap.org/data/2.5/weather
   ```

   Replace `your_openweathermap_api_key` with your actual API key from OpenWeatherMap. You can get this key by signing up at [OpenWeatherMap](https://openweathermap.org/).

## Usage

To start the development server, run the following command:

```bash
npm run dev
```

Open your browser and navigate to http://localhost:3000 to view the application.

### Project Structure

The project follows a standard React and Next.js structure:

- `pages/`: Contains the application's pages.
- `components/`: Contains reusable React components.
- `services/`: Contains service functions for API interactions.
- `styles/`: Contains global and component-specific styles.
- `context/`: Contains the context provider and hooks for managing the state of favorite cities.

### Key Components

- **`CityWeatherCard.tsx`**: A component that displays weather information for a specific city. This component includes the functionality to add or remove a city from favorites.
- **`Home.tsx`**: The main page component that integrates the search functionality, displays default cities, and lists favorite cities.

### Context Management

The project uses React Context to manage the state of favorite cities across the application. This ensures that the list of favorite cities is easily accessible and manageable from any component.

- **`FavoriteContext.tsx`**: This file contains the context provider and a custom hook for managing favorite cities. It uses `useState` to store and update the list of favorite cities, and provides functions to add and remove cities from this list.
