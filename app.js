const express = require("express")
const session = require("express-session")
const app = express()
require("dotenv").config()
require("./src/config/databaseConnection")
const port = process.env.PORT || 5001
const todoRouter = require("./src/routers/todoRouter")
const userRouter = require("./src/routers/userRouter")

app.use(express.json())
app.use(session({ secret: "sdhjfbhdjf8723fb", resave: false, saveUninitialized: true }))

app.use("/", todoRouter) //ara katman olarak 
app.use("/", userRouter)

app.get("/", (req, res) => {
    res.send("Hoşgeldiniz...");
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})
