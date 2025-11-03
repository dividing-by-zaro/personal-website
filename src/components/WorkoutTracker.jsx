import { useState, useEffect } from 'react';
import '../styles/Widget.css';

function WorkoutTracker() {
  const [days, setDays] = useState([]);

  const getIntensityLevel = (minutes) => {
    if (minutes === 0) return 0;
    if (minutes < 20) return 1;
    if (minutes < 40) return 2;
    if (minutes < 60) return 3;
    return 4;
  };

  useEffect(() => {
    const generateYearDays = () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      const startOfYear = new Date(currentYear, 0, 1);

      // Real active minutes data
      const activeMinutesData = {
        '2025-07-20': 55, '2025-07-21': 30, '2025-07-22': 30, '2025-07-23': 50, '2025-07-24': 15,
        '2025-07-25': 0, '2025-07-26': 40, '2025-07-27': 60, '2025-07-28': 45, '2025-07-29': 25,
        '2025-07-30': 50, '2025-07-31': 45, '2025-08-01': 20, '2025-08-02': 50, '2025-08-03': 35,
        '2025-08-04': 40, '2025-08-05': 60, '2025-08-06': 0, '2025-08-07': 30, '2025-08-08': 55,
        '2025-08-09': 35, '2025-08-10': 25, '2025-08-11': 10, '2025-08-12': 0, '2025-08-13': 5,
        '2025-08-14': 0, '2025-08-15': 50, '2025-08-16': 0, '2025-08-17': 105, '2025-08-18': 5,
        '2025-08-19': 60, '2025-08-20': 65, '2025-08-21': 50, '2025-08-22': 60, '2025-08-23': 5,
        '2025-08-24': 60, '2025-08-25': 75, '2025-08-26': 70, '2025-08-27': 45, '2025-08-28': 30,
        '2025-08-29': 70, '2025-08-30': 30, '2025-08-31': 70, '2025-09-01': 0, '2025-09-02': 60,
        '2025-09-03': 85, '2025-09-04': 65, '2025-09-05': 90, '2025-09-06': 70, '2025-09-07': 95,
        '2025-09-08': 30, '2025-09-09': 60, '2025-09-10': 30, '2025-09-11': 75, '2025-09-12': 30,
        '2025-09-13': 60, '2025-09-14': 0, '2025-09-15': 30, '2025-09-16': 105, '2025-09-17': 30,
        '2025-09-18': 50, '2025-09-19': 30, '2025-09-20': 90, '2025-09-21': 25, '2025-09-22': 30,
        '2025-09-23': 60, '2025-09-24': 30, '2025-09-25': 75, '2025-09-26': 40, '2025-09-27': 195,
        '2025-09-28': 71, '2025-09-29': 15, '2025-09-30': 60, '2025-10-01': 40, '2025-10-02': 60,
        '2025-10-03': 0, '2025-10-04': 0, '2025-10-05': 65, '2025-10-06': 0, '2025-10-07': 75,
        '2025-10-08': 30, '2025-10-09': 75, '2025-10-10': 25, '2025-10-11': 0, '2025-10-12': 30,
        '2025-10-13': 0, '2025-10-14': 0, '2025-10-15': 70, '2025-10-16': 0, '2025-10-17': 0,
        '2025-10-18': 0, '2025-10-19': 0, '2025-10-20': 0, '2025-10-21': 55, '2025-10-22': 30,
        '2025-10-23': 75, '2025-10-24': 25, '2025-10-25': 75, '2025-10-26': 50, '2025-10-27': 30,
        '2025-10-28': 75, '2025-10-29': 35, '2025-10-30': 75, '2025-10-31': 0, '2025-11-01': 25,
        '2025-11-02': 75
      };

      // Find the first Sunday on or before Jan 1
      const firstDayOfWeek = startOfYear.getDay();
      const startDate = new Date(startOfYear);
      startDate.setDate(startDate.getDate() - firstDayOfWeek);

      const daysArray = [];
      let currentDate = new Date(startDate);

      // Generate days until today, organized by weeks
      while (currentDate <= today) {
        const dateString = currentDate.toISOString().split('T')[0];
        const isInCurrentYear = currentDate.getFullYear() === currentYear;

        // Only show data for current year
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
    };

    generateYearDays();
  }, []);

  return (
    <div className="widget workout-tracker">
      <h3>My year in workouts</h3>
      <div className="tracker-grid">
        {days.map((day) => (
          <div
            key={day.date}
            className={`tracker-day intensity-${day.intensity}`}
            title={`${day.dayName}, ${day.month} ${day.day}${day.activeMinutes > 0 ? ` - ${day.activeMinutes} min` : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

export default WorkoutTracker;
