import Client from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export type OrderProducts = {
  id?: number;
  quantity: number;
  product_id: number;
  order_id: number;
};

export class OrdersStore {
  async show(user_id: number): Promise<OrderProducts[]> {
    try {
      const sql = `SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE user_id=($1)`;

      const conn = await Client.connect();

      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order ${user_id}. Error: ${err}`);
    }
  }

  async showOrdersByStatus(
    user_id: number,
    status: string
  ): Promise<OrderProducts[]> {
    try {
      const sql = `SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE user_id=($1) AND status = ($2)`;

      const conn = await Client.connect();

      const result = await conn.query(sql, [user_id, status]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order ${user_id}. Error: ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';

      const conn = await Client.connect();

      const result = await conn.query(sql, [order.status, order.user_id]);

      const newProduct = result.rows[0];

      conn.release();

      return newProduct;
    } catch (err) {
      throw new Error(
        `Could not add new order for user ${order.user_id}. Error: ${err}f`
      );
    }
  }

  async createOrderProducts(order: OrderProducts): Promise<OrderProducts> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';

      const conn = await Client.connect();

      const result = await conn.query(sql, [
        order.quantity,
        order.order_id,
        order.product_id,
      ]);

      const newProduct = result.rows[0];

      conn.release();

      return newProduct;
    } catch (err) {
      throw new Error(
        `Could not add new order ${order.product_id}. Error: ${err}`
      );
    }
  }
}
