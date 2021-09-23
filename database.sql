
CREATE TABLE "user" (
  "id" int PRIMARY KEY,
  "username" varchar(255) UNIQUE,
  "email" varchar(255) UNIQUE,
  "password" varchar(100),
);

CREATE TABLE "product" (
  "id" serial PRIMARY KEY,
  "product" varchar(255),
  "price" money,
  "quantity" int,
);

CREATE TABLE "cart" (
  "id" serial PRIMARY KEY,
  "user_id" INT REFERENCES users(id)
  "product_id" INT REFERENCES products(id) 
  "product" varchar(255),
  "quantity" int,
  "total_price" money,
);

CREATE TABLE "order" (
  "id" serial PRIMARY KEY,
  "cart_id" INT  REFERENCES cart(id)
  "user_id" INT REFERENCES users(id)
  "product_id" INT REFERENCES products(id) 
  "product" varchar(255),
  "quantity" int,
  "total_price" money,
);