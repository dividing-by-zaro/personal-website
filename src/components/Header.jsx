import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="site-header">
      <h1>Isabel Zaro</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/resume">Resume</Link>
      </nav>
    </header>
  );
}

export default Header;
