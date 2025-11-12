import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/posts';
import '../styles/Page.css';

function BlogIndex() {
  const posts = getAllPosts();

  // Group posts by year
  const postsByYear = posts.reduce((acc, post) => {
    const year = post.date.substring(0, 4);
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});

  // Format date as MM-DD
  const formatDate = (dateString) => {
    const month = dateString.substring(5, 7);
    const day = dateString.substring(8, 10);
    return `${month}-${day}`;
  };

  return (
    <main>
      <div className="blog-index">
        {Object.entries(postsByYear)
          .sort(([yearA], [yearB]) => yearB - yearA)
          .map(([year, yearPosts]) => (
            <div key={year} className="blog-year-group">
              <h2 className="blog-year">{year}</h2>
              <div className="blog-year-posts">
                {yearPosts.map(post => (
                  <article key={`${post.date}-${post.title}`} className="blog-preview">
                    <Link to={`/thoughts/${post.date}/${post.title}`}>
                      {post.displayTitle}
                    </Link>
                    {post.tags && post.tags.length > 0 && (
                      <span className="blog-tags">
                        {post.tags.map(tag => (
                          <span key={tag} className="blog-tag">#{tag}</span>
                        ))}
                      </span>
                    )}
                    <span className="blog-dots"></span>
                    <time>{formatDate(post.date)}</time>
                  </article>
                ))}
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default BlogIndex;
