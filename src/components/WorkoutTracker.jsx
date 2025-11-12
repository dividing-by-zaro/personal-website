import { useState, useEffect } from 'react';
import '../styles/Widget.css';

function WorkoutTracker() {
  const [days, setDays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR5EvUfsCGrvqAWqReroHWr5YvoB-PHivV7XVq-qxC56OPXkQrl0ElznfJZ4Tk759oKmSeSiPcI3-bP/pub?gid=0&single=true&output=csv';

  const getIntensityLevel = (minutes) => {
    if (minutes === 0) return 0;
    if (minutes < 20) return 1;
    if (minutes < 40) return 2;
    if (minutes < 60) return 3;
    return 4;
  };

  const fetchAndParseCSV = async () => {
    try {
      const response = await fetch(CSV_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch workout data');
      }

      const csvText = await response.text();
      const lines = csvText.trim().split('\n');

      // Parse CSV into object format
      const activeMinutesData = {};
      for (let i = 1; i < lines.length; i++) {
        const [date, duration] = lines[i].split(',');
        if (date && duration) {
          // Convert M/D/YYYY to YYYY-MM-DD format
          const parsedDate = new Date(date.trim());
          const year = parsedDate.getFullYear();
          const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
          const day = String(parsedDate.getDate()).padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}`;

          activeMinutesData[formattedDate] = parseInt(duration.trim(), 10);
        }
      }

      return activeMinutesData;
    } catch (err) {
      throw new Error(`Error loading workout data: ${err.message}`);
    }
  };

  useEffect(() => {
    const generateYearDays = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const activeMinutesData = await fetchAndParseCSV();

        const today = new Date();
        const currentYear = today.getFullYear();
        const startOfYear = new Date(currentYear, 0, 1);

        const firstDayOfWeek = startOfYear.getDay();
        const startDate = new Date(startOfYear);
        startDate.setDate(startDate.getDate() - firstDayOfWeek);

        const daysArray = [];
        let currentDate = new Date(startDate);

        while (currentDate <= today) {
          const dateString = currentDate.toISOString().split('T')[0];
          const isInCurrentYear = currentDate.getFullYear() === currentYear;

          const activeMinutes = isInCurrentYear ? (activeMinutesData[dateString] || 0) : 0;

          daysArray.push({
            date: dateString,
            day: currentDate.getDate(),
            month: currentDate.toLocaleDateString('en-US', { month: 'short' }),
            activeMinutes: activeMinutes,
            intensity: isInCurrentYear ? getIntensityLevel(activeMinutes) : 0,
            dayName: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
            isCurrentYear: isInCurrentYear
          });

          currentDate.setDate(currentDate.getDate() + 1);
        }

        setDays(daysArray);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    generateYearDays();
  }, []);

  return (
    <div className="widget workout-tracker">
      <h3>My year in workouts</h3>
      {isLoading && (
        <div style={{ opacity: 0.6, padding: '2rem', textAlign: 'center' }}>
          Loading workout data...
        </div>
      )}
      {error && (
        <div style={{ opacity: 0.6, padding: '2rem', textAlign: 'center' }}>
          {error}
        </div>
      )}
      {!isLoading && !error && (
        <div className="tracker-grid">
          {days.map((day) => (
            <div
              key={day.date}
              className={`tracker-day intensity-${day.intensity}`}
              title={`${day.dayName}, ${day.month} ${day.day}${day.activeMinutes > 0 ? ` - ${day.activeMinutes} min` : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkoutTracker;
