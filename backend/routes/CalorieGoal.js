const express = require("express");
const router = express.Router();
const protect = require("../middlewares/protect")
const { setCalorieGoal } = require("../controllers/CalorieGoal")

router.route("/set").post(protect, setCalorieGoal)

module.exports = router;