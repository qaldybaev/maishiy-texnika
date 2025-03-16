const { Router } = require("express")
const { getAllCategory, createCategory, updateCategory, deleteCategory } = require("../controller/category.controller")

const categoryRoute = Router()

categoryRoute
.get("/category",getAllCategory)
.post("/category",createCategory)
.put("/category/:id",updateCategory)
.delete("/category/:id",deleteCategory)


module.exports = categoryRoute