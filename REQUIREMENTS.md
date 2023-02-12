# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index 'products/' [GET]
- Show 'products/:id/' [GET]
- Create [token required] 'products/' [POST]
- [OPTIONAL] Top 5 most popular products 'popular-products/' [GET] (not implemented)
- [OPTIONAL] Products by category (args: product category) 'products/category/:category/' [GET] (not implemented)

#### Users

- Index [token required] 'users/' [GET]
- Show [token required] 'users/:id/' [GET]
- Create N 'users/' [POST]

#### Orders

- Current Order by user (args: user id)[token required] 'orders/:id' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] 'orders/:id/:status' [GET]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

| Column |         Type          | Collation | Nullable |     Table "public.users" Default     |
| ------ | :-------------------: | --------: | :------: | :----------------------------------: |
| id     |        integer        |           | not null | nextval('products_id_seq'::regclass) |
| name   | character varying(50) |           | not null |
| price  |        integer        |           | not null |

    Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
    Referenced by:
    TABLE "order_products" CONSTRAINT "product_fk" FOREIGN KEY (product_id) REFERENCES products(id)

#### User

- id
- firstName
- lastName
- password

| Column    |         Type          | Collation | Nullable |   Table "public.users" Default    |
| --------- | :-------------------: | --------: | :------: | :-------------------------------: |
| id        |        integer        |           | not null | nextval('users_id_seq'::regclass) |
| firstname | character varying(50) |           | not null |
| lastname  | character varying(50) |           | not null |
| password  |   character varying   |           | not null |

    Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    Referenced by:
    TABLE "orders" CONSTRAINT "user_fk" FOREIGN KEY (user_id) REFERENCES users(id)

#### Orders

- id
- user_id
- status of order (active or complete)

| Column  |       Type        | Collation | Nullable |   Table "public.orders" Default    |
| ------- | :---------------: | --------: | :------: | :--------------------------------: |
| id      |      integer      |           | not null | nextval('orders_id_seq'::regclass) |
| status  | character varying |           | not null |    'active'::character varying     |
| user_id |      bigint       |           | not null |

    "order_products_pkey" PRIMARY KEY, btree (id)
    Foreign-key constraints:
    "order_fk" FOREIGN KEY (order_id) REFERENCES orders(id)
    "product_fk" FOREIGN KEY (product_id) REFERENCES products(id)

#### Order_Products

- id
- id of each product in the order
- quantity of each product in the order
- status of order (active or complete)

| Column   |  Type   | Collation | Nullable | Table "public.order_products" Default      |
| -------- | :-----: | --------: | :------: | ------------------------------------------ |
| id       | integer |           | not null | nextval('order_products_id_seq'::regclass) |
| quantity | integer |           |          |
| order_id | bigint  |           | not null |
| user_id  | bigint  |           | not null |

    order_products_pkey" PRIMARY KEY, btree (id)
    Foreign-key constraints:
    "order_fk" FOREIGN KEY (order_id) REFERENCES orders(id)
    "product_fk" FOREIGN KEY (product_id) REFERENCES products(id)
