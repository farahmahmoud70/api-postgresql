import Client from '../database';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';

dotenv.config();

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

const { BCRYPT_PASSWORD: pepper, SALT_ROUNDS: saltRounds } = process.env;

export class UsersStore {
  async index(): Promise<User[]> {
    try {
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
        'INSERT INTO users (firstname, lastname ,password) VALUES($1, $2, $3) RETURNING *';

      const conn = await Client.connect();

      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
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

  async authenticate(id: string, password: string): Promise<User | null> {
    const conn = await Client.connect();
    const sql = 'SELECT password FROM users WHERE id=($1)';

    const result = await conn.query(sql, [id]);

    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }

    return null;
  }
}
