CREATE TABLE "users" (
  "id" int PRIMARY KEY,
  "username" varchar(255) UNIQUE NOT NULL,
  "email" varchar(255) UNIQUE NOT NULL,
  "password" varchar(100) NOT NULL
);

CREATE TABLE "products" (
  "id" serial PRIMARY KEY ,
  "product" varchar(255) NOT NULL,
  "price" money NOT NULL,
  "qty" int NOT NULL 
);

CREATE TABLE "carts" (
  "id" serial PRIMARY KEY,
  "userid" INT REFERENCES users(id) NOT NULL,
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "modified" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "cartitems" (
  "id" serial PRIMARY KEY,
  "cartid" INT REFERENCES carts(id) NOT NULL,
  "productid" INT REFERENCES products(id) NOT NULL,
  "name" varchar(255) NOT NULL,
  "qty" int NOT NULL,
  "price" money NOT NULL
);

CREATE TABLE "orders" (
  "id" serial PRIMARY KEY,
  "userid" INT REFERENCES users(id) NOT NULL,
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "modified" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "orderitems" (
  "id" serial PRIMARY KEY,
  "orderid" INT REFERENCES orders(id) NOT NULL,
  "productid" INT REFERENCES products(id) NOT NULL,
  "name" varchar(255) NOT NULL,
  "qty" int NOT NULL,
  "price" money NOT NULL,
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "admin" (
  "id" serial PRIMARY KEY NOT NULL,
  "adminname" varchar(225) NOT NULL,
  "password" varchar(225) NOT NULL
);