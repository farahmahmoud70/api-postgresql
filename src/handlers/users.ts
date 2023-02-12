import express, { Request, Response } from 'express';

import { User, UsersStore } from '../models/users';

import jwt from 'jsonwebtoken';

import { verifyAuthToken } from '../utilities/helper';

import dotenv from 'dotenv';

dotenv.config();

const store = new UsersStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (_req: Request, res: Response) => {
  const user = await store.show('id', _req.params.id as string);
  res.json(user);
};

const create = async (_req: Request, res: Response) => {
  const user: User = {
    firstname: _req.body.firstname,
    lastname: _req.body.lastname,
    password: _req.body.password,
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
    id: _req.body.id,
    firstname: _req.body.firstname,
    lastname: _req.body.lastname,
    password: _req.body.password,
  };
  try {
    const u = await store.authenticate(
      user.id as unknown as string,
      user.password
    );
    const token = jwt.sign({ user: u }, process.env.NEW_USER_TOKEN as string);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json(`couldn't authenticate user ${user.id} ${error}`);
  }
};

const users_routes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
  app.post('/user-authenticate', authenticate);
};

export default users_routes;
