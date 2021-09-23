CREATE TABLE "users" (
  "id" int PRIMARY KEY,
  "username" varchar(255) UNIQUE,
  "email" varchar(255) UNIQUE,
  "password" varchar(100)
);

CREATE TABLE "products" (
  "id" serial PRIMARY KEY,
  "product" varchar(255),
  "price" money,
  "qty" int
);

CREATE TABLE "carts" (
  "id" serial PRIMARY KEY,
  "userid" INT REFERENCES users(id),
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "modified" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "cartitems" (
  "id" serial PRIMARY KEY,
  "cartid" INT REFERENCES carts(id),
  "productid" INT REFERENCES products(id) ,
  "name" varchar(255),
  "qty" int,
  "price" money
);

CREATE TABLE "orders" (
  "id" serial PRIMARY KEY,
  "userid" INT REFERENCES users(id),
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "modified" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "orderitems" (
  "id" serial PRIMARY KEY,
  "orderid" INT REFERENCES orders(id),
  "productid" INT REFERENCES products(id),
  "name" varchar(255),
  "qty" int,
  "price" money,
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);