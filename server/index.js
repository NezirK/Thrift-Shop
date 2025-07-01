const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const adminRoutes = require('./routes/admin.routes');
const path = require('path');

dotenv.config();
connectDB();

const app = express(); // Krijo app PARAPRIKISHT

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rrugët
app.use('/api', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Thrift Shop API is running 🚀');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
