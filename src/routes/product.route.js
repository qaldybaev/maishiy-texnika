const { Router } = require('express')
const { getAllProducts, createProduct, deletedProduct, updateProduct, getProductsByCategory } = require('../controller/product.controller')

const productRouter = Router()

productRouter
.get("/products", getAllProducts)
.get("/products/:id", getProductsByCategory)
.post("/products",createProduct)
.put("/products/:id",updateProduct)
.delete("/products/:id",deletedProduct)

module.exports = productRouter