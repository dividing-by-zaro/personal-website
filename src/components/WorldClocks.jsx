import { useState, useEffect } from 'react';
import '../styles/Widget.css';

function WorldClocks() {
  const [times, setTimes] = useState({});

  // You can customize these timezones
  const timezones = [
    { name: 'New York', tz: 'America/New_York' },
    { name: 'London', tz: 'Europe/London' },
    { name: 'Tokyo', tz: 'Asia/Tokyo' },
  ];

  useEffect(() => {
    const updateTimes = () => {
      const newTimes = {};
      timezones.forEach(({ name, tz }) => {
        newTimes[name] = new Date().toLocaleTimeString('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
        });
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="widget clocks">
      <h3>World Clocks</h3>
      <div className="clock-list">
        {timezones.map(({ name }) => (
          <div key={name} className="clock-item">
            <span className="location">{name}</span>
            <span className="time">{times[name]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorldClocks;
