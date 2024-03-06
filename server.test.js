const request = require('supertest');
const app = require('./index'); // Import your Express app

let server; // Declare a variable to store the server instance

beforeAll(async () => {
  server = await app.listen(3001); // Start the server before running any tests
});

afterAll(async () => {
  await server.close(); // Close the server after all tests have finished
});

test('GET /weather with valid lat and lon', async () => {
  const response = await request(app).get('/weather').query({ lat: '47.6038321', lon: '-122.330062' });
  expect(response.status).toBe(200);
});

test('GET /weather with unknown city', async () => {
  const response = await request(app).get('/weather').query({ searchQuery: 'London' });
  expect(response.status).toBe(404);
});