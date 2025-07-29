const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const urlRoutes = require('./routes/urlRoutes');
const guestRoutes = require('./routes/guestRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const allowedOrigins = ['https://urlshortener-mu-ashy.vercel.app', 'http://localhost:3000'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS Not Allowed'));
    }
  },
  credentials: true,
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

app.use('/api', urlRoutes);
app.use('/api/guest', guestRoutes);
app.use('/api/auth', authRoutes);

app.use('/', urlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));