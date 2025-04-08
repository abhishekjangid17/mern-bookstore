import { useEffect, useState } from 'react';
import api from '../api';
import { getCurrentUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const user = getCurrentUser();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Failed to fetch books:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await api.delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchBooks();
    } catch (err) {
      alert('Delete failed!');
      console.error(err);
    }
  };

  const handleAddToCart = (book) => {
    addToCart(book);
    toast.success("Book added to cart!");
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem', background: darkMode ? '#121212' : '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ color: darkMode ? '#fff' : '#333' }}>📚 All Books</h2>

      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '0.75rem 1rem',
          margin: '1rem 0',
          width: '100%',
          maxWidth: '400px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          background: darkMode ? '#1e1e1e' : '#fff',
          color: darkMode ? '#fff' : '#333',
          fontSize: '1rem'
        }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            style={{
              background: darkMode ? '#1e1e1e' : '#fff',
              color: darkMode ? '#fff' : '#333',
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '8px',
              width: '200px',
              position: 'relative',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Price:</strong> ₹{book.price}</p>

            {user?.isAdmin ? (
              <div style={{ marginTop: '0.5rem' }}>
                <button onClick={() => handleDelete(book._id)} style={{ marginRight: '0.5rem' }}>
                  🗑 Delete
                </button>
                <button onClick={() => navigate(`/edit-book/${book._id}`)}>
                  📝 Edit
                </button>
              </div>
            ) : (
              <button onClick={() => handleAddToCart(book)} style={{ marginTop: '0.5rem' }}>
                🛒 Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
