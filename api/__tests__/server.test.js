const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

describe('[POST] api/user/register', () => {
  test('decline invalid request', async () => {
    const user = {username: 'testuser0',password: ''}
    const result = await request(server).post('/api/user/register').send(user)
    expect(result.body.status).toBe(500)
    expect(result.body.message).toBe('must input username and password')
  })
  test('is correctly update the database for the user', async () => {
    const user = {username: 'testuser0', password: '1234'}
    const result = await request(server).post('/api/user/register').send(user)
    expect(result.status).toBe(200)
  })
})

describe('[POST] api/user/login', () => {
  test('decline invalid input', async () => {
    const user = {username: 'testuser0',password: ''}
    const result = await request(server).post('/api/user/login').send(user)
    expect(result.body.status).toBe(500)
    expect(result.body.message).toBe('must input username and password')
  })
  test('getting back message with generated token when login', async () => {
    const user = {username: 'testuser0', password: '1234'}
    await request(server).post('/api/user/register').send(user)
    
    const result = await request(server).post('/api/user/login').send(user)
    expect(result.status).toBe(200)
    expect(result.body.message).toBe('Welcome testuser0')
  })
})

