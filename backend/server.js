const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orders');





// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/orders', orderRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Book routes
app.use('/api/books', bookRoutes);

// authRoutes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
