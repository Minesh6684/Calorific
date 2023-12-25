const express = require("express");
const router = express.Router();
const protect = require("../middlewares/protect");
const { AddWeight, GetWeightRecord } = require("../controllers/Weigth");

router.route("/add").post(protect, AddWeight);
router.route("/get_record").get(protect, GetWeightRecord);

module.exports = router;
