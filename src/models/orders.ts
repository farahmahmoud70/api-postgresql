import Client from '../database';

export type Order = {
  id?: number;
  status: string;
  userId: number;
};

export type OrderProducts = {
  id?: number;
  quantity: number;
  productId: number;
  orderId: number;
};

export class OrdersStore {
  async show(userId: number): Promise<OrderProducts[]> {
    try {
      const sql = `SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE user_id=($1)`;

      const conn = await Client.connect();

      const result = await conn.query(sql, [userId]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order ${userId}. Error: ${err}`);
    }
  }

  async showOrdersByStatus(
    userId: number,
    status: string
  ): Promise<OrderProducts[]> {
    try {
      const sql = `SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE user_id=($1) AND status = ($2)`;

      const conn = await Client.connect();

      const result = await conn.query(sql, [userId, status]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order ${userId}. Error: ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';

      const conn = await Client.connect();

      const result = await conn.query(sql, [order.status, order.userId]);

      const newProduct = result.rows[0];

      conn.release();

      return newProduct;
    } catch (err) {
      throw new Error(
        `Could not add new order for user ${order.userId}. Error: ${err}f`
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
        order.orderId,
        order.productId,
      ]);

      const newProduct = result.rows[0];

      conn.release();

      return newProduct;
    } catch (err) {
      throw new Error(
        `Could not add new order ${order.productId}. Error: ${err}`
      );
    }
  }
}
