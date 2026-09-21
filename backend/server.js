const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');

dotenv.config();

const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const dietRoutes = require('./routes/diet');

const app = express();
const PORT = process.env.PORT || 5002;
const DEFAULT_MONGODB_URI = 'mongodb://127.0.0.1:27017/nutribot';

async function connectDatabase() {
  const targetUri = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

  try {
    await mongoose.connect(targetUri);
    console.log('MongoDB connected');
  } catch (error) {
    if (targetUri !== DEFAULT_MONGODB_URI) {
      throw error;
    }

    console.log('Local MongoDB not found. Starting temporary in-memory MongoDB...');
    const memoryServer = await MongoMemoryServer.create();
    const memoryUri = memoryServer.getUri();
    process.env.MONGODB_URI = memoryUri;

    await mongoose.connect(memoryUri);
    console.log(`MongoDB connected via in-memory server (${memoryUri})`);
  }
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/diet', dietRoutes);

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
