import express, { Request, Response } from 'express';

import { User, UsersStore } from '../models/users';

import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

const store = new UsersStore();

const index = async (_req: Request, res: Response) => {
  try {
    const authorizationHeader = _req.headers.authorization;
    const token = authorizationHeader!.split(' ')[1];
    jwt.verify(token, process.env.NEW_USER_TOKEN as string);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  const users = await store.index();
  res.json(users);
};

const show = async (_req: Request, res: Response) => {
  try {
    const authorizationHeader = _req.headers.authorization;
    const token = authorizationHeader!.split(' ')[1];
    jwt.verify(token, process.env.NEW_USER_TOKEN as string);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  const user = await store.show(_req.params.id);
  res.json(user);
};

const create = async (_req: Request, res: Response) => {
  const user: User = {
    firstname: _req.body.firstname,
    lastname: _req.body.lastname,
    password_digest: _req.body.password_digest,
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.NEW_USER_TOKEN as string
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (_req: Request, res: Response) => {
  const user: User = {
    firstname: _req.body.username,
    lastname: _req.body.lastname,
    password_digest: _req.body.password_digest,
  };
  try {
    const u = await store.authenticate(user.firstname, user.password_digest);
    const token = jwt.sign({ user: u }, process.env.NEW_USER_TOKEN as string);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const users_routes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/new-user', create);
  app.post('/user-authenticate', authenticate);
};

export default users_routes;
