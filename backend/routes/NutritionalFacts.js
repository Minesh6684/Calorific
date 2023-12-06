const express = require("express");
const router = express.Router();
const { getNutritionalFacts } = require("../controllers/NutritionalFacts");

router.route("/").get(getNutritionalFacts);

module.exports = router;
