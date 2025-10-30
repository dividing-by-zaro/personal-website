import { Link } from 'react-router-dom';
import CurrentlyReading from '../components/CurrentlyReading';
import VegasWeather from '../components/VegasWeather';
import DaysSinceCollege from '../components/DaysSinceCollege';
import WorkoutTracker from '../components/WorkoutTracker';
import GitHubProjects from '../components/GitHubProjects';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <header>
        <h1>Isabel Zaro</h1>
        <nav>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/resume">Resume</Link>
        </nav>
      </header>

      <main className="widgets">
        <div className="widget-column">
          <VegasWeather />
          <DaysSinceCollege />
        </div>
        <CurrentlyReading />
      </main>

      <div className="full-width-widget">
        <GitHubProjects />
      </div>

      <div className="full-width-widget">
        <WorkoutTracker />
      </div>
    </div>
  );
}

export default Home;
