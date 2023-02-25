const router = require("express").Router()
const userController = require("../controllers/userController")

router.post("/register", userController.register)

router.post("/login", userController.login)

router.get("/dashboard", userController.dashboard)

router.get("/logout", userController.logout)

module.exports = router;

