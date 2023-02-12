import request from 'supertest';
import express from 'express';
import routes from '../../routes';

describe('Orders Routes Descriptions', () => {
  const app = express();
  routes(app);

  it('Should return user current order', async () => {
    const res = await request(app).get('/orders/1');
    expect(res.statusCode).toBe(200);
  });

  it('Should return user completed order', async () => {
    const res = await request(app).get('/orders/1/completed');
    expect(res.statusCode).toBe(200);
  });
});
