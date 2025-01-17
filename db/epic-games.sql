DROP TABLE products;

-- CREATE TABLE 

CREATE TABLE products(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  productName TEXT,
  productDescription TEXT,
  productImage TEXT,
  rating TEXT,
  price TEXT,
  urlSlug TEXT UNIQUE
);

-- Kan även seeda data - alltså lägga till data till tabellen
-- INSERT INTO...

INSERT INTO products (
  productName,
  productDescription,
  productImage,
  brand,
  sku,
  price,
  urlSlug
) VALUES (
    'Svart t-shirt',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, omnis.',
    'https://placehold.co/400x600/png?text=Jane+Doe',
    'Levis',
    '222222',
    '199 SEK',
    'svart-t-shirt'
);