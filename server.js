const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const medicineRoutes = require('./routes/medicines');
const groceryRoutes = require('./routes/groceries');
const emergencyRoutes = require('./routes/emergency');
const emergencyContactsRoutes = require('./routes/emergency-contacts');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/groceries', groceryRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/emergency-contacts', emergencyContactsRoutes);

// WebSocket connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('taskCreated', (task) => {
    io.emit('newTask', task);
  });

  socket.on('taskUpdated', (task) => {
    io.emit('taskUpdate', task);
  });

  socket.on('taskDeleted', (taskId) => {
    io.emit('taskDelete', taskId);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 