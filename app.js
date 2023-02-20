const express = require("express")
const app = express()
require("dotenv").config()
require("./src/config/databaseConnection")
const port = process.env.PORT || 5001
const todoRouter = require("./src/routers/todoRouter")


app.use(express.json()) //body'den gelen verileri okuyabileyecek

app.use("/api", todoRouter) //ara katman olarak 

app.get("/", (req, res) => {
    res.send("Hoşgeldiniz...");
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})
