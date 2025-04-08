// src/pages/Orders.jsx
import { useEffect, useState } from 'react';
import api from '../api';
import { useTheme } from '../context/ThemeContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  return (
    <div style={{ padding: '2rem', background: darkMode ? '#121212' : '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ color: darkMode ? '#fff' : '#333' }}>🧾 Your Orders</h2>

      {orders.length === 0 ? (
        <p style={{ color: darkMode ? '#ccc' : '#555' }}>No orders found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                background: darkMode ? '#1e1e1e' : '#fff',
                color: darkMode ? '#fff' : '#333',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
            >
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Items:</strong></p>
              <ul style={{ marginLeft: '1rem' }}>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.title} – ₹{item.price}
                  </li>
                ))}
              </ul>
              <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
