import { Link } from 'react-router-dom';
import VegasWeather from './VegasWeather';
import '../styles/Header.css';

function Header() {
  return (
    <header className="site-header">
      <div className="header-title-row">
        <h1>Isabel Zaro</h1>
        <VegasWeather />
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/resume">Resume</Link>
      </nav>
    </header>
  );
}

export default Header;
