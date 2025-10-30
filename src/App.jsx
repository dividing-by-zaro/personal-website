import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Resume from './pages/Resume';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:date/:title" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;
