// import request from 'supertest';
// import app from '../src/index';

// describe('Express App', () => {
//   it('should return a list of contacts', async () => {
//     const response = await request(app).get('/contacts');
//     expect(response.status).toBe(200);

//     // Check that the response body has the 'contacts' property
//     expect(response.body.contacts).toBeDefined();
//     expect(Array.isArray(response.body.contacts)).toBe(true);
//     expect(response.body.contacts.length).toBeGreaterThan(0);
//   });

//   it('should return 404 for an invalid route', async () => {
//     const response = await request(app).get('/invalid-route');
//     expect(response.status).toBe(404);
//   });

//   it('should upload a file and add a new contact', async () => {
//     const response = await request(app)
//       .post('/upload')
//       .field('id', 'new-id')
//       .field('name', 'New Name')
//       .field('handle', '@newhandle')
//       .attach('avatar', 'spec/fixtures/avatar.jpg'); // Assuming this file exists

//     expect(response.status).toBe(302); // Redirect status code
//   });
// });
import request from 'supertest';
import app from '../src/index';

describe('Express App', () => {
  it('should return a list of contacts', async () => {
    const response = await request(app).get('/contacts');
    expect(response.status).toBe(200);
    expect(response.body.contacts).toBeDefined();
    expect(Array.isArray(response.body.contacts)).toBe(true);
    expect(response.body.contacts.length).toBeGreaterThan(0);
  });

  it('should return 404 for an invalid route', async () => {
    const response = await request(app).get('/invalid-route');
    expect(response.status).toBe(404);
  });

  it('should upload a file and add a new contact', async () => {
    const response = await request(app)
      .post('/upload')
      .field('id', 'new-id')
      .field('name', 'New Name')
      .field('handle', '@newhandle')
      .attach('avatar', 'spec/fixtures/avatar.jpg'); // Ensure this file exists

    expect(response.status).toBe(302); // Redirect status code
  });
});
