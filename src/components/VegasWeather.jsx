import { useState, useEffect } from 'react';
import '../styles/Home.css';

function VegasWeather() {
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState('');

  const getWeatherIcon = (weatherDesc, isDay) => {
    const desc = weatherDesc.toLowerCase();

    // Rain conditions
    if (desc.includes('rain') || desc.includes('drizzle')) {
      return '🌧';
    }
    // Thunderstorm
    if (desc.includes('thunder') || desc.includes('storm')) {
      return '⛈';
    }
    // Snow
    if (desc.includes('snow') || desc.includes('sleet')) {
      return '❄';
    }
    // Fog/Mist
    if (desc.includes('fog') || desc.includes('mist') || desc.includes('haze')) {
      return '🌫';
    }
    // Cloudy
    if (desc.includes('overcast') || desc.includes('cloudy')) {
      return '☁';
    }
    // Partly cloudy
    if (desc.includes('partly')) {
      return '⛅';
    }
    // Clear
    return isDay ? '☀' : '☾';
  };

  useEffect(() => {
    const updateFavicon = (icon) => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="75" font-size="75">${icon}</text></svg>`;
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        favicon.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      }
    };

    const fetchWeather = async () => {
      try {
        // Using wttr.in - a free weather API that doesn't require API key
        const response = await fetch('https://wttr.in/Las-Vegas?format=j1');
        const data = await response.json();

        if (data && data.current_condition && data.current_condition[0]) {
          const condition = data.current_condition[0];
          const temp = condition.temp_F;
          const weatherDesc = condition.weatherDesc[0].value;

          // Determine if it's daytime in Vegas (6am - 6pm)
          const vegasTime = new Date().toLocaleTimeString('en-US', {
            timeZone: 'America/Los_Angeles',
            hour: '2-digit',
            hour12: false
          });
          const hour = parseInt(vegasTime);
          const isDay = hour >= 6 && hour < 18;

          const weatherIcon = getWeatherIcon(weatherDesc, isDay);
          setWeather({
            temp,
            icon: weatherIcon,
            description: weatherDesc
          });
          updateFavicon(weatherIcon);
        }
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      }
    };

    fetchWeather();
    // Update every 10 minutes
    const interval = setInterval(fetchWeather, 600000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const vegasTime = new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setTime(vegasTime);
    };

    updateTime();
    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="vegas-weather-bar">
      <span>Las Vegas</span>
      <span className="separator">·</span>
      <span className="weather-info" aria-label={weather?.description || 'Weather'}>
        {weather ? `${weather.icon} ${weather.temp}°F` : '—'}
      </span>
      <span className="separator">·</span>
      <span>{time || '—'}</span>
    </div>
  );
}

export default VegasWeather;
