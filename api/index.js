require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// routes
const authRoutes = require('../routes/authRoutes');
const disposisiRoutes = require('../routes/disposisiRoutes');
const notifRoutes = require('../routes/notifRoutes');
const displayRoutes = require('../routes/displayRoutes');

const app = express();

mongoose.connect(process.env.DB_CONNECTION);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:3001', 'https://frontend-navnotif.vercel.app'],
  credentials: true
}));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/task', disposisiRoutes);
app.use('/api/notif', notifRoutes);
app.use('/api/media', displayRoutes);

module.exports = app;
