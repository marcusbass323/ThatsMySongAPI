const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const homeRoutes = require('./routes/home');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 30000,  // 30 seconds
});

async function run() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Connected to MongoDB!');

    // Now you can start your server since the MongoDB connection is established
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }

// Home routes
app.get('/', homeRoutes);

// Register routes
app.post('/api/v1/register', registerRoutes);

// Login routes
app.post('/api/v1/login', loginRoutes);
}



run();