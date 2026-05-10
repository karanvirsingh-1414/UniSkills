const request = require('supertest');
const app = require('../app');

// ─── AUTH TESTS ─────────────────────────────────────────────────────────────

describe('🔐 Auth API Tests', () => {

  // Test 1: Health check
  test('GET / → server is alive', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('UniSkills');
  });

  // Test 2: Register with missing fields → should fail gracefully
  test('POST /api/auth/register → rejects empty body', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({});
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  // Test 3: Login with wrong credentials → should return error
  test('POST /api/auth/login → rejects wrong credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'fake@test.com', password: 'wrongpass123' });
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  // Test 4: Forgot password with non-existent email → should return error
  test('POST /api/auth/forgot-password → rejects unknown email', async () => {
    const res = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: 'nobody@fake.com' });
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

});

// ─── SKILLS API TESTS ───────────────────────────────────────────────────────

describe('📚 Skills API Tests', () => {

  // Test 5: Get all skills → should return array
  test('GET /api/skills/all → returns array of skills', async () => {
    const res = await request(app).get('/api/skills/all');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});

// ─── SESSION API TESTS ──────────────────────────────────────────────────────

describe('🎓 Sessions API Tests', () => {

  // Test 6: Request session without data → should fail
  test('POST /api/sessions/request → rejects empty payload', async () => {
    const res = await request(app)
      .post('/api/sessions/request')
      .send({});
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  // Test 7: Accept session without data → should fail
  test('POST /api/sessions/accept → rejects empty payload', async () => {
    const res = await request(app)
      .post('/api/sessions/accept')
      .send({});
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

});
