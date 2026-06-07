const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// In-memory storage for waitlist leads
const waitlist = [];

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0'
  });
});

// Waitlist signup endpoint
app.post('/api/waitlist', (req, res) => {
  const { name, email, company, idea } = req.body;

  // Validate required fields
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  // Check for duplicate email
  const duplicateEntry = waitlist.find(entry => entry.email === email);
  if (duplicateEntry) {
    return res.status(409).json({ message: 'Email already on waitlist' });
  }

  // Create new entry
  const entry = {
    name,
    email,
    company: company || '',
    idea: idea || '',
    timestamp: new Date().toISOString()
  };

  waitlist.push(entry);

  res.status(201).json({
    message: 'Successfully joined waitlist',
    entry
  });
});

// Get waitlist count (for admin/debug purposes)
app.get('/api/waitlist', (req, res) => {
  res.json({
    count: waitlist.length,
    entries: waitlist
  });
});

// Start server only if this file is run directly (not required by tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`TrueNorth backend running on port ${PORT}`);
  });
}

module.exports = app;
