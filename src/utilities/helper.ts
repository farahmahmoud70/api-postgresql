import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyAuthToken = (
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/ban-types
  next: Function
) => {
  try {
    const authorizationHeader = _req.headers.authorization;
    const token = authorizationHeader!.split(' ')[1];
    jwt.verify(token, process.env.NEW_USER_TOKEN as string);
    next();
  } catch (error) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
};
