const { Router } = require('express')
const { getAllProducts, createProduct } = require('../controller/product.controller')

const productRouter = Router()

productRouter.get("/products", getAllProducts)
.post("/products",createProduct)

module.exports = productRouter