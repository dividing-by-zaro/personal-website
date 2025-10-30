import { useState, useEffect } from 'react';
import '../styles/Widget.css';

function DaysSinceCollege() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const calculateDays = () => {
      const collegeEndDate = new Date('2018-05-18');
      const today = new Date();
      const diffTime = Math.abs(today - collegeEndDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays);
    };

    calculateDays();
    // Update daily at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow - now;

    const timeout = setTimeout(() => {
      calculateDays();
      // Then update every 24 hours
      const interval = setInterval(calculateDays, 86400000);
      return () => clearInterval(interval);
    }, timeUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="widget days-since">
      <h3>Days since college</h3>
      <div className="days-count">{days.toLocaleString()}</div>
    </div>
  );
}

export default DaysSinceCollege;
