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
        <time>{post.date}</time>
        <div className="post-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}

export default BlogPost;
