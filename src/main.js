const { config } = require("dotenv")
const { join } = require("node:path")
const express = require("express")
const productRouter = require("./routes/product.route")
const categoryRoute = require("./routes/category.routes")


config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views", join(process.cwd(), "src", "views"))

app.use("/api/v1", productRouter)
app.use("/api/v1", categoryRoute)

app.listen(+process.env.APP_PORT, () => {
    console.log(`http://localhost:${+process.env.APP_PORT}`)
})