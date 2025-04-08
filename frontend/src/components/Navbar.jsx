import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ 
      ...styles.navbar, 
      background: darkMode ? '#121212' : '#f8f9fa',
      color: darkMode ? '#fff' : '#333'
    }}>
      <div style={styles.logo}>
        📚 <Link to="/" style={styles.brand}>Bookstore</Link>
      </div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        {user?.isAdmin && (
          <Link to="/add-book" style={styles.link}>Add Book</Link>
        )}
        {!user && (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
            <Link to="/orders" style={styles.link}>My Orders</Link>
            <Link to="/orders" style={styles.link}>Orders</Link>

          </>
        )}
        {user && (
          <>
            {!user.isAdmin && (
              <Link to="/cart" style={styles.link}>🛒 Cart</Link>
            )}
            <span style={styles.user}>👤 {user.name || 'User'}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        )}
        <button onClick={toggleTheme} style={styles.themeBtn}>
          {darkMode ? '🌞 Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
};

// ✅ Make sure styles object is defined!
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    borderBottom: '1px solid #e0e0e0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    fontFamily: 'sans-serif',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  brand: {
    textDecoration: 'none',
    color: 'inherit'
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    fontSize: '1rem',
    transition: 'color 0.2s',
  },
  user: {
    fontSize: '1rem',
    color: 'inherit',
  },
  logoutBtn: {
    padding: '0.5rem 0.75rem',
    background: '#ff4d4f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  themeBtn: {
    padding: '0.4rem 0.6rem',
    background: '#6c63ff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  }
};

export default Navbar;
