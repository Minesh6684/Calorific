const express = require("express");
const router = express.Router();
const protect = require("../middlewares/protect");
const { AddMeal, getHistory } = require("../controllers/History");

router.route("/add").post(protect, AddMeal);
router.route("/get").get(protect, getHistory);

module.exports = router;
