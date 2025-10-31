import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
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
    <div className="page">
      <main>
        <article className="blog-post">
          <h1>{post.displayTitle}</h1>
          <time>{post.date}</time>
          <div className="post-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>
    </div>
  );
}

export default BlogPost;
