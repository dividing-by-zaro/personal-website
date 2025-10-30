import { Link } from 'react-router-dom';
import CurrentlyReading from '../components/CurrentlyReading';
import VegasWeather from '../components/VegasWeather';
import WorkoutTracker from '../components/WorkoutTracker';
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
        <VegasWeather />
        <CurrentlyReading />
      </main>

      <div className="full-width-widget">
        <WorkoutTracker />
      </div>
    </div>
  );
}

export default Home;
