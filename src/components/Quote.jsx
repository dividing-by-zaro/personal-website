import { useState, useEffect } from 'react';
import '../styles/Widget.css';

function Quote() {
  const [quote, setQuote] = useState({ text: '', author: '' });

  // Sample quotes - you can expand this list
  const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  ];

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="widget quote">
      <blockquote>
        <p>"{quote.text}"</p>
        <footer>— {quote.author}</footer>
      </blockquote>
    </div>
  );
}

export default Quote;
