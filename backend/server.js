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
let connectionPromise;

async function connectDatabase() {
  if (connectionPromise) {
    return connectionPromise;
  }

  const targetUri = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

  connectionPromise = (async () => {
    try {
      await mongoose.connect(targetUri);
      console.log('MongoDB connected');
    } catch (error) {
      if (targetUri !== DEFAULT_MONGODB_URI || process.env.VERCEL) {
        throw error;
      }

      console.log('Local MongoDB not found. Starting temporary in-memory MongoDB...');
      const memoryServer = await MongoMemoryServer.create();
      const memoryUri = memoryServer.getUri();
      process.env.MONGODB_URI = memoryUri;

      await mongoose.connect(memoryUri);
      console.log(`MongoDB connected via in-memory server (${memoryUri})`);
    }
  })();

  return connectionPromise;
}

// Middleware
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    res.status(503).json({ msg: 'Database unavailable' });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/diet', dietRoutes);

if (require.main === module) {
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
}

module.exports = app;
