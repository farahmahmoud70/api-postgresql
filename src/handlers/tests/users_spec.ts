import request from 'supertest';
import express from 'express';
import routes from '../../routes';

describe('Users Routes Descriptions', () => {
  const app = express();
  routes(app);

  it('Should return all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
  });

  it('Should return user with id 1', async () => {
    const res = await request(app).get('/users/1');
    expect(res.statusCode).toBe(200);
  });
});
