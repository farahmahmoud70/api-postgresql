CREATE TABLE order_products (id SERIAL PRIMARY KEY, quantity integer, order_id bigint NOT NULL, product_id bigint NOT NULL,
CONSTRAINT order_FK FOREIGN KEY (order_id) REFERENCES orders(id),
CONSTRAINT product_FK FOREIGN KEY (product_id) REFERENCES products(id));