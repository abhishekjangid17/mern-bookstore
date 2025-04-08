import { useCart } from '../context/CartContext';
import { getCurrentUser } from '../utils/auth';
import api from '../api';
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContext';

const Checkout = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const user = getCurrentUser();
  const { darkMode } = useTheme();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = async () => {
    try {
      const res = await api.post('/orders', { books: cartItems }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      toast.success('Order placed successfully!');
      clearCart();
    } catch (err) {
      console.error('Order error:', err);
      toast.error('Failed to place order');
    }
  };

  return (
    <div style={{
      padding: '2rem',
      background: darkMode ? '#121212' : '#f5f5f5',
      minHeight: '100vh',
      color: darkMode ? '#fff' : '#333'
    }}>
      <h2>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map((item) => (
              <li key={item._id} style={{
                background: darkMode ? '#1e1e1e' : '#fff',
                padding: '1rem',
                margin: '1rem 0',
                borderRadius: '8px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
              }}>
                <h4>{item.title}</h4>
                <p><strong>Price:</strong> ₹{item.price}</p>
                <button onClick={() => removeFromCart(item._id)}>❌ Remove</button>
              </li>
            ))}
          </ul>

          <h3>Total: ₹{total}</h3>
          <button
            onClick={handlePlaceOrder}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              background: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            ✅ Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
