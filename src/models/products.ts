import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductsStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`connot get products ${error}`);
    }
  }

  async show(
    queryString: string,
    queryStringValue: string
  ): Promise<Product[]> {
    try {
      const sql = `SELECT * FROM products WHERE ${queryString}=($1)`;

      const conn = await Client.connect();

      const result = await conn.query(sql, [queryStringValue]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not find product ${queryStringValue}. Error: ${err}`
      );
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';

      const conn = await Client.connect();

      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);

      const newProduct = result.rows[0];

      conn.release();

      return newProduct;
    } catch (err) {
      throw new Error(
        `Could not add new product ${product.name}. Error: ${err}`
      );
    }
  }
}
