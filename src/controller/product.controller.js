const { query } = require("express")

exports.getAllProducts = async function(req,res) {
    try {
        const products = await query('SELECT * FROM products')

        res.send(products)
    } catch (error) {
        console.log(error.message)
    }
}