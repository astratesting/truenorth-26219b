const request = require('supertest')
const app = require('../main')

describe('API Endpoints', () => {
  test('GET /api/health returns healthy status', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body).toHaveProperty('status', 'healthy')
    expect(response.body).toHaveProperty('timestamp')
  })

  test('POST /api/waitlist successfully adds a new entry', async () => {
    const newEntry = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      company: 'Acme Inc.',
      idea: 'A platform for founders'
    }

    const response = await request(app)
      .post('/api/waitlist')
      .send(newEntry)
      .expect('Content-Type', /json/)
      .expect(201)

    expect(response.body).toHaveProperty('message', 'Successfully joined waitlist')
    expect(response.body.entry).toHaveProperty('name', 'Jane Doe')
    expect(response.body.entry).toHaveProperty('email', 'jane@example.com')
  })

  test('POST /api/waitlist rejects duplicate email', async () => {
    const entry = {
      name: 'Duplicate Test',
      email: 'duplicate@example.com',
      company: 'Test Co.',
      idea: 'Testing duplicates'
    }

    await request(app).post('/api/waitlist').send(entry).expect(201)
    const response = await request(app).post('/api/waitlist').send(entry).expect(409)

    expect(response.body).toHaveProperty('message', 'Email already on waitlist')
  })

  test('POST /api/waitlist validates required fields', async () => {
    const response = await request(app)
      .post('/api/waitlist')
      .send({ name: '', email: '' })
      .expect('Content-Type', /json/)
      .expect(400)

    expect(response.body).toHaveProperty('message')
  })

  test('GET /api/waitlist returns all entries', async () => {
    await request(app)
      .post('/api/waitlist')
      .send({ name: 'Alice', email: 'alice@example.com', company: '', idea: '' })

    const response = await request(app)
      .get('/api/waitlist')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body).toHaveProperty('count')
    expect(Array.isArray(response.body.entries)).toBe(true)
    expect(response.body.entries.length).toBeGreaterThan(0)
  })

  test('returns 404 for non-existent routes', async () => {
    await request(app)
      .get('/api/nonexistent')
      .expect(404)
  })
})
