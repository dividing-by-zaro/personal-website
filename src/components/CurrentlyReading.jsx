import { useState } from 'react';
import '../styles/Widget.css';

function CurrentlyReading() {
  const [imageError, setImageError] = useState(false);

  const book = {
    title: 'Mordew',
    author: 'Alex Pheby',
    isbn: '1913111024',
    coverImage: 'https://covers.openlibrary.org/b/isbn/1913111024-L.jpg',
    progress: 13
  };

  return (
    <div className="widget currently-reading">
      <h3>Reading now</h3>
      <div className="book-display">
        <div className="book-cover">
          {imageError ? (
            <div className="cover-placeholder"></div>
          ) : (
            <img
              src={book.coverImage}
              alt=""
              className="cover-image"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        <div className="book-details">
          <div className="book-title">{book.title}</div>
          <div className="book-author">{book.author}</div>
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${book.progress}%` }}></div>
            </div>
            <div className="progress-percentage">{book.progress}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentlyReading;
