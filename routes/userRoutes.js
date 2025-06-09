const express = require("express")
const { registerUser, loginUser, currentUser, getAllUsers } = require("../controllers/userController")

const router  = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/current", currentUser)

router.get("/", getAllUsers)

module.exports = router