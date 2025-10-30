import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getAllPosts } from '../utils/posts';
import '../styles/Page.css';

function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="page">
      <Header />

      <main>
        <h1>Blog</h1>
        <div className="blog-index">
          {posts.map(post => (
            <article key={`${post.date}-${post.title}`} className="blog-preview">
              <Link to={`/blog/${post.date}/${post.title}`}>
                <h2>{post.displayTitle}</h2>
              </Link>
              <time>{post.date}</time>
              <p>{post.preview}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default BlogIndex;
