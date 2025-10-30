import { Link } from 'react-router-dom';
import Quote from '../components/Quote';
import VegasWeather from '../components/VegasWeather';
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
        <Quote />
      </main>
    </div>
  );
}

export default Home;
