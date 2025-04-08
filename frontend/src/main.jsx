import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider> {/* ✅ This must wrap <App /> */}
        <App />
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);
