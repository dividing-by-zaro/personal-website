import matter from 'gray-matter';
import { Buffer } from 'buffer';

// Make Buffer available globally for gray-matter
window.Buffer = Buffer;

// Import all markdown files from the posts directory
const postFiles = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true });

// Parse and process all posts
export const getAllPosts = () => {
  const posts = Object.entries(postFiles).map(([filepath, content]) => {
    const { data, content: markdown } = matter(content);

    // Extract date and title from filename
    // Format: ../posts/2024-10-29-my-first-post.md
    const filename = filepath.split('/').pop().replace('.md', '');
    // Date is first 10 characters (YYYY-MM-DD)
    const date = filename.substring(0, 10);
    // Title slug is everything after the date and dash
    const slug = filename.substring(11);

    return {
      ...data,
      date: date,
      title: slug,
      displayTitle: data.title || slug,
      preview: data.preview || '',
      content: markdown
    };
  });

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Get a specific post by date and title
export const getPost = (date, title) => {
  const posts = getAllPosts();
  return posts.find(post => post.date === date && post.title === title);
};
