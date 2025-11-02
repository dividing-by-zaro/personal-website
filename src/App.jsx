import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Resume from './pages/Resume';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import './styles/Home.css';

function App() {
  return (
    <Router>
      <div className="home">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/thoughts" element={<BlogIndex />} />
          <Route path="/thoughts/:date/:title" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
