import express, { Request, Response } from 'express';

import { Product, ProductsStore } from '../models/products';

import { verifyAuthToken } from '../utilities/helper';

import dotenv from 'dotenv';

dotenv.config();

const store = new ProductsStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const showProductById = async (_req: Request, res: Response) => {
  const product = await store.show('id', _req.params.id);
  res.json(product);
};

const create = async (_req: Request, res: Response) => {
  const product: Product = {
    name: _req.body.name,
    price: _req.body.price,
  };

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
  app.get('/products/:id', showProductById);
  app.post('/products', verifyAuthToken, create);
};

export default products_routes;
