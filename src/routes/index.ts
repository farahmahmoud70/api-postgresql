import express from 'express';
import orders_routes from '../handlers/orders';
import products_routes from '../handlers/products';
import users_routes from '../handlers/users';
const routes = (app: express.Application) => {
  users_routes(app);
  products_routes(app);
  orders_routes(app);
};

export default routes;
