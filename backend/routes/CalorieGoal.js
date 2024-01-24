const express = require("express");
const router = express.Router();
const protect = require("../middlewares/protect")
const { setCalorieGoal, getCalorieGoal } = require("../controllers/CalorieGoal")

router.route("/set").post(protect, setCalorieGoal)
router.route("/get").get(protect, getCalorieGoal)

module.exports = router;