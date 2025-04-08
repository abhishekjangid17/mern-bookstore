import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate('/checkout');
  };

  return (
    <div style={{
      padding: '2rem',
      background: darkMode ? '#121212' : '#f9f9f9',
      minHeight: '100vh',
      color: darkMode ? '#fff' : '#333'
    }}>
      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((item, idx) => (
              <li key={idx} style={{
                border: '1px solid #ccc',
                padding: '1rem',
                marginBottom: '1rem',
                background: darkMode ? '#1e1e1e' : '#fff',
                borderRadius: '8px'
              }}>
                <h3>{item.title}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => removeFromCart(item._id)} style={{ background: '#ff4d4f', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '5px', cursor: 'pointer' }}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <h3>Total: ₹{totalPrice}</h3>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleCheckout} style={{ padding: '0.75rem 1.5rem', background: 'green', color: '#fff', border: 'none', borderRadius: '8px' }}>
              Proceed to Checkout
            </button>
            <button onClick={clearCart} style={{ padding: '0.75rem 1.5rem', background: 'gray', color: '#fff', border: 'none', borderRadius: '8px' }}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
