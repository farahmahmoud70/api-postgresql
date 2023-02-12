import express, { Request, Response } from 'express';

import { Order, OrderProducts, OrdersStore } from '../models/orders';
import { verifyAuthToken } from '../utilities/helper';

const store = new OrdersStore();

const showOrderByUserId = async (_req: Request, res: Response) => {
  const order = await store.show(parseInt(_req.params.id));
  res.json(order);
};

const showUserOrderByStatus = async (_req: Request, res: Response) => {
  const order = await store.showOrdersByStatus(
    parseInt(_req.params.id),
    _req.params.status
  );
  res.json(order);
};

const create = async (_req: Request, res: Response) => {
  const order: Order = {
    status: _req.body.status,
    userId: _req.body.userId,
  };

  try {
    const newOrder = await store.create(order);

    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createOrderProducts = async (_req: Request, res: Response) => {
  const order: OrderProducts = {
    quantity: parseInt(_req.body.quantity),
    orderId: parseInt(_req.params.id),
    productId: _req.body.productId,
  };

  try {
    const addedProduct = await store.createOrderProducts(order);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orders_routes = (app: express.Application) => {
  app.post('/orders', verifyAuthToken, create);
  app.post('/orders/:id/product', verifyAuthToken, createOrderProducts);
  app.get('/orders/:id', showOrderByUserId);
  app.get('/orders/:id/:status', showUserOrderByStatus);
};

export default orders_routes;
