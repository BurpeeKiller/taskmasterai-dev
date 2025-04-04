import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, CloudLightning, CloudSnow, CloudDrizzle } from 'lucide-react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Simuler un délai de chargement pour l'exemple
        // Dans une application réelle, vous utiliseriez une API météo comme OpenWeatherMap
        setTimeout(() => {
          // Données météo simulées
          const mockWeather = {
            location: 'Paris, France',
            temperature: 18,
            condition: 'Partly Cloudy',
            humidity: 65,
            windSpeed: 12,
            forecast: [
              { day: 'Aujourd\'hui', temp: 18, condition: 'cloudy' },
              { day: 'Demain', temp: 20, condition: 'sunny' },
              { day: 'Mer', temp: 17, condition: 'rainy' }
            ]
          };
          
          setWeather(mockWeather);
          setLoading(false);
        }, 1500);
      } catch (error) {
        setError('Impossible de charger les données météo');
        console.error('Erreur lors du chargement des données météo:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Fonction pour obtenir l'icône météo en fonction de la condition
  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'sunny':
        return <Sun className="text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="text-gray-500" />;
      case 'rainy':
        return <CloudRain className="text-blue-500" />;
      case 'stormy':
        return <CloudLightning className="text-purple-500" />;
      case 'snowy':
        return <CloudSnow className="text-blue-300" />;
      case 'drizzle':
        return <CloudDrizzle className="text-blue-400" />;
      default:
        return <Sun className="text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded-md animate-pulse"></div>
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded-md animate-pulse"></div>
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded-md animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  return (
    <div>
      {/* Météo actuelle */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-medium">{weather.location}</h3>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold">{weather.temperature}°C</span>
            <span className="text-sm text-neutral-500">{weather.condition}</span>
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            Humidité: {weather.humidity}% • Vent: {weather.windSpeed} km/h
          </div>
        </div>
        <div className="text-3xl">
          {getWeatherIcon(weather.condition)}
        </div>
      </div>

      {/* Prévisions */}
      <div className="mt-4 border-t border-neutral-200 dark:border-neutral-700 pt-3">
        <h4 className="text-sm font-medium mb-2">Prévisions</h4>
        <div className="grid grid-cols-3 gap-2">
          {weather.forecast.map((day, index) => (
            <div key={index} className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-2 text-center">
              <div className="text-xs font-medium">{day.day}</div>
              <div className="my-1">{getWeatherIcon(day.condition)}</div>
              <div className="text-sm font-bold">{day.temp}°C</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
