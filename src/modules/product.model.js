const productModel = `
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    count SMALLINT NOT NULL DEFAULT 1,
    category_id INT, 
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL
);
`;

module.exports = { productModel }