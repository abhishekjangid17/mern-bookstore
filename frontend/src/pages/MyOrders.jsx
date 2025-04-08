import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  return (
    <div style={{
      padding: '2rem',
      background: darkMode ? '#121212' : '#f9f9f9',
      color: darkMode ? '#fff' : '#333',
      minHeight: '100vh'
    }}>
      <h2>📜 My Orders</h2>

      {orders.length === 0 ? (
        <p>You haven’t placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{
            marginBottom: '1.5rem',
            padding: '1rem',
            background: darkMode ? '#1e1e1e' : '#fff',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Total:</strong> ₹{order.total}</p>
            <ul style={{ paddingLeft: '1.2rem' }}>
              {order.items.map((item, i) => (
                <li key={i}>{item.title} × {item.quantity}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
