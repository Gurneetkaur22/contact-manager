const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/contactmanager')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Contact Manager API is running' });
});

// Routes
app.use('/api/contacts', require('./routes/contacts'));

// For Vercel serverless
module.exports = app;

// For local development
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}