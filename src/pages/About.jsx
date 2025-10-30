import { Link } from 'react-router-dom';
import '../styles/Page.css';

function About() {
  return (
    <div className="page">
      <nav>
        <Link to="/">Home</Link>
      </nav>

      <main>
        <h1>About</h1>
        <p>Tell us about yourself here.</p>
      </main>
    </div>
  );
}

export default About;
