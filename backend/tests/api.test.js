import { expect, test, jest, beforeEach, afterEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import cors from 'cors';

// Mock the backend app setup for testing
const createTestApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // In-memory storage for tests
  const waitlist: Array<{ name: string; email: string; company?: string; idea?: string; timestamp: string }> = [];

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // Waitlist endpoint
  app.post('/api/waitlist', (req, res) => {
    const { name, email, company, idea } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Valid email is required' });
    }

    const duplicate = waitlist.find((entry) => entry.email === email);
    if (duplicate) {
      return res.status(409).json({ message: 'Email already on waitlist' });
    }

    const entry = {
      name,
      email,
      company: company || '',
      idea: idea || '',
      timestamp: new Date().toISOString(),
    };

    waitlist.push(entry);
    res.status(201).json({ message: 'Successfully joined waitlist', entry });
  });

  // Get waitlist (for testing)
  app.get('/api/waitlist', (req, res) => {
    res.json({ count: waitlist.length, entries: waitlist });
  });

  return app;
};

describe('Backend API Tests', () => {
  let app: express.Express;

  beforeEach(() => {
    app = createTestApp();
  });

  describe('GET /api/health', () => {
    test('should return healthy status with timestamp and uptime', async () => {
      const response = await request(app).get('/api/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(new Date(response.body.timestamp).toISOString()).toBeTruthy();
    });
  });

  describe('POST /api/waitlist', () => {
    test('should successfully add a new waitlist entry', async () => {
      const newEntry = {
        name: 'John Doe',
        email: 'john@example.com',
        company: 'TestCo',
        idea: 'A test idea',
      };

      const response = await request(app)
        .post('/api/waitlist')
        .send(newEntry);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Successfully joined waitlist');
      expect(response.body.entry).toMatchObject({
        name: 'John Doe',
        email: 'john@example.com',
        company: 'TestCo',
        idea: 'A test idea',
      });
      expect(response.body.entry).toHaveProperty('timestamp');
    });

    test('should require name and email', async () => {
      const response = await request(app)
        .post('/api/waitlist')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Name and email are required');
    });

    test('should require valid email format', async () => {
      const response = await request(app)
        .post('/api/waitlist')
        .send({ name: 'John', email: 'invalid-email' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Valid email is required');
    });

    test('should prevent duplicate email registration', async () => {
      const entry = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      await request(app).post('/api/waitlist').send(entry);
      const response = await request(app).post('/api/waitlist').send(entry);

      expect(response.status).toBe(409);
      expect(response.body.message).toBe('Email already on waitlist');
    });

    test('should accept optional company and idea fields', async () => {
      const entry = {
        name: 'Jane Doe',
        email: 'jane@example.com',
      };

      const response = await request(app)
        .post('/api/waitlist')
        .send(entry);

      expect(response.status).toBe(201);
      expect(response.body.entry.company).toBe('');
      expect(response.body.entry.idea).toBe('');
    });
  });

  describe('GET /api/waitlist', () => {
    test('should return all waitlist entries', async () => {
      await request(app)
        .post('/api/waitlist')
        .send({ name: 'User1', email: 'user1@test.com' });

      await request(app)
        .post('/api/waitlist')
        .send({ name: 'User2', email: 'user2@test.com' });

      const response = await request(app).get('/api/waitlist');

      expect(response.status).toBe(200);
      expect(response.body.count).toBe(2);
      expect(response.body.entries).toHaveLength(2);
    });
  });
});
