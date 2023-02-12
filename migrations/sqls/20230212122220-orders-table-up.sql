CREATE TABLE orders (id SERIAL PRIMARY KEY, status VARCHAR(50) NOT NULL, user_id bigint NOT NULL,
CONSTRAINT user_FK FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE orders ALTER "status" SET DEFAULT 'active';