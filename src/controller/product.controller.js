const { query } = require("../database/pg")

exports.getAllProducts = async function (req, res) {
    try {
        const products = await query('SELECT * FROM products')
        res.send(products)

    } catch (error) {
        console.log(error.message)
    }
}
exports.createProduct = async function(req, res) {
    try {
        const { name, price, count } = req.body;

        const product = await query(
            `INSERT INTO products (name, price, count) VALUES ($1, $2, $3) RETURNING *`,
            [name, price, count]
        );

        res.status(201).json(product);
    } catch (error) {
        console.error("Database error:", error.message);
    }
};
