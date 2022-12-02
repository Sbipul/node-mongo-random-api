const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
router.route("/random").get(userController.getRandomUser)
router.route("/user").get(userController.getAllUsers)
router.route("/save").post(userController.saveUser)
router.route("/update/:id").patch(userController.updateOne)
router.route("/delete/:id").delete(userController.removeOne)
module.exports = router