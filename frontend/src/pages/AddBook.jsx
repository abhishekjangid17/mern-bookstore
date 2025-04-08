import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import formStyles from '../styles/formStyles';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post('/books', { title, author, price }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      navigate('/');
    } catch (err) {
      alert('Failed to add book');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleAdd} style={styles.form}>
        <h2 style={styles.title}>📘 Add New Book</h2>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Add Book</button>
      </form>
    </div>
  );
};

const styles = formStyles;


export default AddBook;
