const router = require("express").Router()   //expressi de require etmiş oldum
const todoController = require("../controllers/todoController")

router.post("/todo", todoController.todoAdd)  //("/api/todo") aslında bu şekil olacak ama app.js de /api'yi ortak verdim.

router.get("/todo", todoController.todoGetAll)

router.put("/todo/:id", todoController.todoUpdate)  //güncellemek

router.delete("/todo/:id", todoController.todoDelete)

router.get("/todo/:id", todoController.todoGet)   //belirli istenilen id için nesne getirmek


module.exports = router