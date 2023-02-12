import request from 'supertest';
import express from 'express';
import routes from '../../routes';

describe('Products Routes Descriptions', () => {
  const app = express();
  routes(app);

  it('Should return all products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
  });

  it('Should return product with ID 1', async () => {
    const res = await request(app).get('/products/1');
    expect(res.statusCode).toBe(200);
  });
});
