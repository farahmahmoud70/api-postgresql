import express, { Request, Response } from 'express';

import { Product, ProductsStore } from '../models/products';

import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

const store = new ProductsStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const showProductById = async (_req: Request, res: Response) => {
  const product = await store.show(_req.params.id);
  res.json(product);
};

const showProductByCategory = async (_req: Request, res: Response) => {
  const product = await store.show(_req.params.category);
  res.json(product);
};

const create = async (_req: Request, res: Response) => {
  const product: Product = {
    name: _req.body.name,
    price: _req.body.price,
    category: _req.body.category,
  };
  try {
    const authorizationHeader = _req.headers.authorization;
    const token = authorizationHeader!.split(' ')[1];
    jwt.verify(token, process.env.NEW_USER_TOKEN as string);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }

  try {
    const newProduct = await store.create(product);

    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const products_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/product', showProductById);
  app.get('/products/:category', showProductByCategory);
  app.post('/new-product', create);
};

export default products_routes;
