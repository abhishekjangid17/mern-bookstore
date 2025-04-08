import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const { darkMode } = useTheme();

  const total = cart?.reduce((acc, item) => acc + (item?.price || 0), 0);

  return (
    <div
      style={{
        padding: '2rem',
        backgroundColor: darkMode ? '#121212' : '#f9f9f9',
        minHeight: '100vh',
      }}
    >
      <h2 style={{ color: darkMode ? '#fff' : '#333', marginBottom: '1rem' }}>
        🛒 Your Cart
      </h2>

      {cart?.length === 0 ? (
        <p style={{ color: darkMode ? '#aaa' : '#555' }}>Your cart is empty.</p>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cart.map((book) => (
              <div
                key={book._id}
                style={{
                  backgroundColor: darkMode ? '#1e1e1e' : '#fff',
                  color: darkMode ? '#fff' : '#333',
                  border: '1px solid #ccc',
                  padding: '1rem',
                  borderRadius: '8px',
                }}
              >
                <h3>{book?.title}</h3>
                <p><strong>Author:</strong> {book?.author}</p>
                <p><strong>Price:</strong> ₹{book?.price}</p>
                <button
                  onClick={() => removeFromCart(book._id)}
                  style={{
                    backgroundColor: '#ff4d4f',
                    color: '#fff',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                  }}
                >
                  ❌ Remove
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', color: darkMode ? '#fff' : '#333' }}>
            <h3>Total: ₹{total}</h3>
            <button
              onClick={() => alert('🛍 Purchase Successful (placeholder)')}
              style={{
                marginTop: '1rem',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '5px',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              🛍 Proceed to Purchase
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
