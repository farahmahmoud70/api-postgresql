/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import Client from '../database';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';

dotenv.config();

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};

const { BCRYPT_PASSWORD: pepper, SALT_ROUNDS: saltRounds } = process.env;

export class UsersStore {
  async index(): Promise<User[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`connot get users ${error}`);
    }
  }

  async show(queryString: string, queryStringValue: string): Promise<User> {
    try {
      const sql = `SELECT * FROM users WHERE ${queryString}=($1)`;

      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [queryStringValue]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${queryStringValue}. Error: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (firstname, lastname, username ,password_digest) VALUES($1, $2, $3, $4) RETURNING *';
      //@ts-ignore
      const conn = await Client.connect();

      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        user.username,
        hash,
      ]);

      const newUser = result.rows[0];

      conn.release();

      return newUser;
    } catch (err) {
      throw new Error(
        `Could not add new user ${user.firstname}. Error: ${err}`
      );
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    //@ts-ignore
    const conn = await Client.connect();
    const sql = 'SELECT password_digest FROM users WHERE username=($1)';

    const result = await conn.query(sql, [username]);
    console.log(result.rows);

    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }

    return null;
  }
}
