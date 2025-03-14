const {Router} = require('express')
const { getAllProducts } = require('../controller/product.controller')

const productRouter = Router()

productRouter.get("/products",getAllProducts)
module.exports = productRouter