const express = require("express");
const router = express.Router();
const { RegisterUser, LoginUser } = require("../controllers/User");

router.route("/register").post(RegisterUser);
router.route("/login").get(LoginUser)

module.exports = router;
