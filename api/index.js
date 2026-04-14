require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const { Server } = require('socket.io');

// routes
const authRoutes = require('../routes/authRoutes');
const disposisiRoutes = require('../routes/disposisiRoutes');
const notifRoutes = require('../routes/notifRoutes');
const displayRoutes = require('../routes/displayRoutes');
const tindaklanjutRoutes = require('../routes/tindaklanjutRoutes');

const app = express();
const httpServer = createServer(app);

mongoose.connect(process.env.DB_CONNECTION);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:3001', 'https://frontend-navnotif.vercel.app'],
  credentials: true
}));

const io = new Server(httpServer, {
  cors: {
    origin: "https://frontend-navnotif.vercel.app",
    methods: ["GET", "POST"]
  }
});
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// routes
app.use('/api/auth', authRoutes);
app.use('/api/task', disposisiRoutes);
app.use('/api/notif', notifRoutes);
app.use('/api/media', displayRoutes);
app.use('/api/tindaklanjut', tindaklanjutRoutes);

module.exports = app;
