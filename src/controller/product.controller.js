const { query } = require("../database/pg")

exports.getAllProducts = async function (req, res) {
    try {
        const products = await query(`Select * from products`);

        res.json(products);
    } catch (error) {
        console.log("Database error:", error.message);
        res.status(500).json({ error: "Serverda xatolik yuz berdi" });
    }
};

exports.getProductsByCategory = async function (req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Notogri ID" });
        }

        const result = await query(
            `
            SELECT c.id AS category_id, c.name AS category_name, 
                json_agg(json_build_object(
                    'id', p.id, 
                    'name', p.name, 
                    'price', p.price, 
                    'count', p.count
                )) AS products
            FROM category c
            LEFT JOIN products p ON p.category_id = c.id
            WHERE c.id = $1
            GROUP BY c.id, c.name
            `,
            [id]
        );

        if (!result || result.length === 0) {
            return res.status(404).json({ message: "Kategoriya topilmadi" });
        }

        res.status(200).send(result);

    } catch (error) {
        console.log("Database error:", error.message);
        res.status(500).json({ error: "Serverda xatolik yuz berdi" });
    }
};

exports.createProduct = async function (req, res) {
    try {
        const { name, price, count, category_id } = req.body;

        const product = await query(
            `INSERT INTO products (name, price, count,category_id) VALUES ($1, $2, $3,$4) RETURNING *`,
            [name, price, count, category_id]
        );

        res.status(201).json(product);
    } catch (error) {
        console.log("Database error:", error.message);
    }
};

exports.updateProduct = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const { name, price, count } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ error: "Notogri ID" });
        }
        if (!name || !price || !count) {
            return res.status(400).json({ error: "Barcha maydonlarni toldiring" });
        }

        const product = await query(
            `UPDATE products 
             SET name = $1, price = $2, count = $3
             WHERE id = $4
             RETURNING *`,
            [name, price, count, id]
        );

        if (!product || product.length === 0) {
            return res.status(404).json({ error: "Mahsulot topilmadi" });
        }

        res.status(200).json({
            message: "Mahsulot yangilandi",
            data: product,
        });
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({ error: "Serverda xatolik yuz berdi" });
    }
};

exports.deletedProduct = async function (req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Notogri ID" });
        }

        const product = await query(
            `DELETE FROM products WHERE id = $1 RETURNING *`, [id]
        );

        if (!product || product.length === 0) {
            return res.status(404).json({ error: "Mahsulot topilmadi" });
        }

        res.status(204).json();

    } catch (error) {
        console.log(error.stack);
        res.status(500).json({ error: "Serverda xatolik yuz berdi" });
    }
};
