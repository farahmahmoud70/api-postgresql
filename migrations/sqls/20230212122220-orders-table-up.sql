CREATE TABLE orders (id SERIAL PRIMARY KEY, status VARCHAR(50), user_id bigint NOT NULL,
CONSTRAINT user_FK FOREIGN KEY (user_id) REFERENCES users(id)
);