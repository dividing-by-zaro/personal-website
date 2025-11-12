import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPost } from '../utils/posts';
import '../styles/Page.css';

function BlogPost() {
  const { date, title } = useParams();
  const post = getPost(date, title);

  if (!post) {
    return (
      <main>
        <p>Post not found</p>
      </main>
    );
  }

  return (
    <main>
      <article className="blog-post">
        <h1>{post.displayTitle}</h1>
        <div className="post-meta">
          <time>{post.date}</time>
          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map(tag => (
                <span key={tag} className="post-tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>
        <div className="post-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}

export default BlogPost;
