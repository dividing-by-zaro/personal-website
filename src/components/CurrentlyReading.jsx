import { useState } from 'react';
import '../styles/Widget.css';

function CurrentlyReading() {
  const [imageErrors, setImageErrors] = useState({});

  const books = [
    {
      title: 'Mordew',
      author: 'Alex Pheby',
      isbn: '9781913111021',
      coverImage: 'https://covers.openlibrary.org/b/isbn/9781913111021-L.jpg',
      status: 'Reading'
    },
    {
      title: 'One Life',
      author: 'Megan Rapinoe',
      isbn: '9781984881168',
      coverImage: 'https://covers.openlibrary.org/b/isbn/9781984881168-L.jpg',
      status: 'Reading'
    },
    {
      title: 'Baptism of Fire',
      author: 'Andrzej Sapkowski',
      isbn: '9780316219181',
      coverImage: 'https://covers.openlibrary.org/b/isbn/9780316219181-L.jpg',
      status: 'Read'
    },
    {
      title: 'My Year of Rest and Relaxation',
      author: 'Ottessa Moshfegh',
      isbn: '9780525522133',
      coverImage: 'https://covers.openlibrary.org/b/isbn/9780525522133-L.jpg',
      status: 'Read'
    },
    {
      title: 'A Separate Peace',
      author: 'John Knowles',
      isbn: '9780743253970',
      coverImage: 'https://covers.openlibrary.org/b/isbn/9780743253970-L.jpg',
      status: 'Read'
    }
  ];

  const handleImageError = (isbn) => {
    setImageErrors(prev => ({ ...prev, [isbn]: true }));
  };

  return (
    <div className="widget currently-reading">
      <h3>My recent reads</h3>
      <div className="books-list">
        {books.map((book) => (
          <div key={book.isbn} className="book-display">
            <div className="book-cover">
              {imageErrors[book.isbn] ? (
                <div className="cover-placeholder"></div>
              ) : (
                <img
                  src={book.coverImage}
                  alt={`${book.title} by ${book.author}`}
                  className="cover-image"
                  onError={() => handleImageError(book.isbn)}
                />
              )}
              {book.status === 'Reading' && (
                <span className="book-status-tag">{book.status}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrentlyReading;
