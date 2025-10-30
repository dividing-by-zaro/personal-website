import { Link } from 'react-router-dom';
import '../styles/Page.css';

function Resume() {
  return (
    <div className="page">
      <nav>
        <Link to="/">Home</Link>
      </nav>

      <main>
        <h1>Resume</h1>
        <p>Your resume content goes here.</p>
      </main>
    </div>
  );
}

export default Resume;
